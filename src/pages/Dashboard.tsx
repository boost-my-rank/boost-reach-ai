import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HowItWorksModal } from "@/components/dashboard/HowItWorksModal";
import { PersonaConfiguration } from "@/components/dashboard/PersonaConfiguration";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    <div className="min-h-screen bg-slate-50">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                  Welcome to BoostMyRank
                </h1>
                <p className="text-slate-600">
                  Configure your outreach settings to start building authority with premium backlinks.
                </p>
              </div>

              <div id="persona-config">
                <PersonaConfiguration />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>

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