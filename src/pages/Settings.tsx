import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          navigate("/signup");
          return;
        }

        setUser(session.user);
        setName(session.user.user_metadata?.full_name || "");
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/signup");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleBillingPortal = async () => {
    try {
      setIsUpdating(true);
      
      // This would call the Stripe portal API
      // For now, show a placeholder toast
      toast({
        title: "Coming Soon",
        description: "Billing portal integration will be available soon.",
      });
    } catch (error) {
      console.error("Billing portal error:", error);
      toast({
        title: "Error",
        description: "Failed to open billing portal",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />
      
      <main className="flex-1 lg:ml-64">
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold text-slate-900 mb-8">Settings</h1>
            
            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="border-slate-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="border-slate-200 bg-slate-50 text-slate-500"
                  />
                  <p className="text-xs text-slate-500">
                    Email cannot be changed through this interface
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-sm rounded-xl mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Billing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Manage your subscription, payment methods, and billing history.
                </p>
                
                <Button 
                  onClick={handleBillingPortal}
                  disabled={isUpdating}
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  {isUpdating ? "Opening..." : "Manage billing"}
                </Button>
                
                <p className="text-xs text-slate-500">
                  Use the Stripe portal to cancel or update your subscription.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;