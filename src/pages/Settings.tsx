import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useToast } from "@/hooks/use-toast";
import { UnifiedHeader } from "@/components/UnifiedHeader";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signup');
        return;
      }
      setUser(session.user);
      setEmail(session.user.email || "");
      setName(session.user.user_metadata?.full_name || "");
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/signup');
      } else {
        setUser(session.user);
        setEmail(session.user.email || "");
        setName(session.user.user_metadata?.full_name || "");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL received");
      }
    } catch (error) {
      console.error("Billing portal error:", error);
      
      // More detailed error message
      let errorMessage = "We couldn't open the billing portal. Please try again or contact support.";
      if (error instanceof Error) {
        errorMessage = `Billing portal error: ${error.message}`;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-canvas">
      <UnifiedHeader />
      <main className="pt-20">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <DashboardSidebar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Account Information */}
              <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                <div className="h-1 bg-warning"></div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-card-foreground mb-4">Account Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-card-foreground font-medium">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="border-card-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-card-foreground font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        readOnly
                        className="bg-muted text-muted-foreground border-card-border"
                        placeholder="your@email.com"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing */}
              <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                <div className="h-1 bg-warning"></div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-card-foreground mb-4">Billing & Subscription</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Manage your subscription, payment methods, and billing history through our secure billing portal.
                    </p>
                    <Button 
                      onClick={handleManageBilling}
                      disabled={isLoading}
                      className="bg-warning hover:bg-warning/90 text-warning-foreground w-full sm:w-auto"
                    >
                      {isLoading ? "Opening Stripe..." : "Manage billing"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Use the Stripe portal to cancel or update your subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </main>
          </div>
        </SidebarProvider>
      </main>
    </div>
  );
};

export default Settings;