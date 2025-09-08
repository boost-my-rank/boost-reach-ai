import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use service role key for database updates
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, updating payment status to inactive");
      
      // Update payment_status to inactive in user_info table
      await supabaseClient
        .from("user_info")
        .upsert({
          user_id: user.id,
          payment_status: "inactive"
        }, { onConflict: 'user_id' });

      return new Response(JSON.stringify({ 
        active: false, 
        status: "inactive" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active subscriptions in our database
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      logStep("Error checking subscription", { error: subscriptionError });
      throw subscriptionError;
    }

    const hasActiveSub = !!subscriptionData;
    let nextBillDate = null;

    if (hasActiveSub) {
      nextBillDate = subscriptionData.current_period_end;
      logStep("Active subscription found in database", { 
        subscriptionId: subscriptionData.stripe_subscription_id, 
        nextBillDate 
      });
    } else {
      logStep("No active subscription found in database");
    }

    // Update payment_status in user_info table
    const newStatus = hasActiveSub ? "active" : "inactive";
    await supabaseClient
      .from("user_info")
      .upsert({
        user_id: user.id,
        payment_status: newStatus
      }, { onConflict: 'user_id' });

    logStep("Updated payment status", { status: newStatus });

    return new Response(JSON.stringify({
      active: hasActiveSub,
      status: newStatus,
      nextBillDate
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});