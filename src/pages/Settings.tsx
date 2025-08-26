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
      // Placeholder for Stripe portal integration
      // In real implementation: POST to /api/stripe/create-portal
      toast({
        title: "Coming Soon",
        description: "Billing management will be available soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal.",
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
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                  Account Settings
                </h1>
                <p className="text-slate-600">
                  Manage your account information and billing preferences.
                </p>
              </div>

              <div className="space-y-6">
                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        readOnly
                        className="bg-slate-50 text-slate-500"
                        placeholder="your@email.com"
                      />
                      <p className="text-xs text-slate-500">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-600">
                        Manage your subscription, payment methods, and billing history through our secure billing portal.
                      </p>
                      <Button 
                        onClick={handleManageBilling}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? "Loading..." : "Manage billing"}
                      </Button>
                      <p className="text-xs text-slate-500">
                        Use the Stripe portal to cancel or update your subscription.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Settings;