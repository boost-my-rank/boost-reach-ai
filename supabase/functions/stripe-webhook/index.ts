import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    // Check environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET environment variable is not set");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No stripe signature found");
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      logStep("Webhook signature verification failed", { error: err });
      return new Response("Webhook signature verification failed", { status: 400 });
    }

    logStep("Webhook event received", { type: event.type, id: event.id });

    // Use service role key for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Handle successful subscription creation
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === "subscription" && session.subscription) {
        logStep("Processing successful subscription", { 
          sessionId: session.id, 
          subscriptionId: session.subscription 
        });

        // Get the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        logStep("Retrieved subscription details", {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end
        });

        // Get customer details to find user_id
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        const userId = customer.metadata?.user_id;

        if (!userId) {
          throw new Error("No user_id found in customer metadata");
        }

        // Save subscription to database
        const { error: insertError } = await supabaseClient
          .from("subscriptions")
          .insert({
            user_id: userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            price_id: subscription.items.data[0]?.price.id || null,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });

        if (insertError) {
          logStep("Failed to insert subscription", { error: insertError });
          throw insertError;
        }

        logStep("Subscription saved to database", { subscriptionId: subscription.id });

        // Update user_info payment status
        const { error: updateError } = await supabaseClient
          .from("user_info")
          .upsert({
            user_id: userId,
            payment_status: subscription.status === "active" ? "active" : "inactive"
          }, { onConflict: "user_id" });

        if (updateError) {
          logStep("Failed to update user payment status", { error: updateError });
        } else {
          logStep("User payment status updated", { userId, status: subscription.status });
        }
      }
    }

    // Handle subscription updates (status changes, renewals, etc.)
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      
      logStep("Processing subscription update", {
        subscriptionId: subscription.id,
        status: subscription.status
      });

      // Update subscription in database
      const { error: updateError } = await supabaseClient
        .from("subscriptions")
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("stripe_subscription_id", subscription.id);

      if (updateError) {
        logStep("Failed to update subscription", { error: updateError });
        throw updateError;
      }

      // Update user payment status
      const { data: subscriptionData } = await supabaseClient
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (subscriptionData) {
        const { error: userUpdateError } = await supabaseClient
          .from("user_info")
          .upsert({
            user_id: subscriptionData.user_id,
            payment_status: subscription.status === "active" ? "active" : "inactive"
          }, { onConflict: "user_id" });

        if (userUpdateError) {
          logStep("Failed to update user payment status", { error: userUpdateError });
        }
      }

      logStep("Subscription updated in database", { subscriptionId: subscription.id });
    }

    // Handle subscription cancellation
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      
      logStep("Processing subscription cancellation", {
        subscriptionId: subscription.id
      });

      // Update subscription status to cancelled
      const { error: updateError } = await supabaseClient
        .from("subscriptions")
        .update({
          status: "cancelled",
          updated_at: new Date().toISOString()
        })
        .eq("stripe_subscription_id", subscription.id);

      if (updateError) {
        logStep("Failed to update cancelled subscription", { error: updateError });
        throw updateError;
      }

      // Update user payment status
      const { data: subscriptionData } = await supabaseClient
        .from("subscriptions")
        .select("user_id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (subscriptionData) {
        const { error: userUpdateError } = await supabaseClient
          .from("user_info")
          .upsert({
            user_id: subscriptionData.user_id,
            payment_status: "inactive"
          }, { onConflict: "user_id" });

        if (userUpdateError) {
          logStep("Failed to update user payment status", { error: userUpdateError });
        }
      }

      logStep("Subscription cancelled in database", { subscriptionId: subscription.id });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
