import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HowItWorksModal } from "@/components/dashboard/HowItWorksModal";
import { PersonaConfiguration } from "@/components/dashboard/PersonaConfiguration";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signup');
        return;
      }
      setUser(session.user);

      // Check if this is the first visit (simplified - in real app you'd track this in DB)
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        setShowHowItWorks(true);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/signup');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleStartConfiguring = () => {
    setShowHowItWorks(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
    // Scroll to configuration section
    const configSection = document.getElementById('persona-config');
    if (configSection) {
      configSection.scrollIntoView({ behavior: 'smooth' });
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
      <Header />
      <main className="pt-20">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <DashboardSidebar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* This Month Stats */}
              <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                <div className="h-1 bg-warning"></div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-card-foreground mb-4">This month</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-2xl font-semibold text-card-foreground">3</div>
                      <div className="text-sm text-muted-foreground">Backlinks earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-card-foreground">$300</div>
                      <div className="text-sm text-muted-foreground">Investment</div>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-card-foreground">2</div>
                      <div className="text-sm text-muted-foreground">New opportunities</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
                <div className="h-1 bg-warning"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-card-foreground">Recent activity</h2>
                    <div className="text-sm text-muted-foreground">3 items</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-medium text-card-foreground">Tech startup featured in Forbes</div>
                        <div className="text-sm text-muted-foreground">Created on 12/07</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-medium text-card-foreground">Expert quote in Industry Report</div>
                        <div className="text-sm text-muted-foreground">Created on 10/07</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-card-foreground">CEO interview on Tech Podcast</div>
                        <div className="text-sm text-muted-foreground">Created on 07/07</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                      View all activity
                    </Button>
                  </div>
                </div>
              </div>

              {/* Configuration Section */}
              <div id="persona-config">
                <PersonaConfiguration />
              </div>
            </div>
            </main>
          </div>
        </SidebarProvider>
      </main>

      {showHowItWorks && (
        <HowItWorksModal 
          isOpen={showHowItWorks}
          onStartConfiguring={handleStartConfiguring}
        />
      )}
    </div>
  );
};

export default Dashboard;