import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CUSTOMER-PORTAL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Simple health check endpoint
  if (req.method === "GET") {
    return new Response(JSON.stringify({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      env: {
        hasSupabaseUrl: !!Deno.env.get("SUPABASE_URL"),
        hasSupabaseAnonKey: !!Deno.env.get("SUPABASE_ANON_KEY"),
        hasStripeSecretKey: !!Deno.env.get("STRIPE_SECRET_KEY")
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  try {
    logStep("Function started");

    // Check environment variables first
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    logStep("Environment check", {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseAnonKey: !!supabaseAnonKey,
      hasStripeSecretKey: !!stripeSecretKey
    });

    if (!supabaseUrl) throw new Error("SUPABASE_URL environment variable is not set");
    if (!supabaseAnonKey) throw new Error("SUPABASE_ANON_KEY environment variable is not set");
    if (!stripeSecretKey) throw new Error("STRIPE_SECRET_KEY environment variable is not set");

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists, create if not
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer if none exists
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
        metadata: { user_id: user.id }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    const origin = req.headers.get("origin") || "http://localhost:8080";
    
    // Determine the correct return URL based on origin
    let returnUrl;
    if (origin.includes('localhost')) {
      returnUrl = `http://localhost:8080/dashboard`;
    } else if (origin.includes('boostmyrank.co')) {
      returnUrl = `https://boostmyrank.co/dashboard`;
    } else if (origin.includes('lovable.app')) {
      returnUrl = `https://preview--boost-reach-ai.lovable.app/dashboard`;
    } else {
      // Fallback to current origin
      returnUrl = `${origin}/dashboard`;
    }

    logStep("Creating customer portal session", { 
      customerId, 
      returnUrl, 
      origin,
      headers: Object.fromEntries(req.headers.entries())
    });

    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      logStep("Customer portal session created", { 
        sessionId: portalSession.id, 
        url: portalSession.url 
      });

      return new Response(JSON.stringify({ url: portalSession.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (stripeError) {
      logStep("Stripe portal session creation failed", { 
        error: stripeError instanceof Error ? stripeError.message : String(stripeError),
        customerId 
      });
      
      // If customer portal is not enabled, provide helpful error
      if (stripeError instanceof Error && stripeError.message.includes('portal')) {
        throw new Error("Customer portal is not enabled in your Stripe account. Please enable it in your Stripe dashboard under Settings > Billing > Customer portal.");
      }
      
      throw stripeError;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in customer-portal", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});