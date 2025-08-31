import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HowItWorksModal } from "@/components/dashboard/HowItWorksModal";
import { PersonaConfiguration } from "@/components/dashboard/PersonaConfiguration";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    // Check for payment success/cancel URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('paid') === '1') {
      // Show success message and clean URL
      setTimeout(() => {
        toast({
          title: "Subscription active",
          description: "Persona will start immediately.",
        });
      }, 500);
      // Clean URL without page refresh
      window.history.replaceState({}, document.title, '/dashboard');
    } else if (urlParams.get('checkout') === 'cancelled') {
      // Show gentle reminder
      setTimeout(() => {
        toast({
          title: "Payment required",
          description: "Payment is required to activate outreach.",
          variant: "destructive",
        });
      }, 500);
      // Clean URL without page refresh
      window.history.replaceState({}, document.title, '/dashboard');
    }

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
      <UnifiedHeader />
      <main className="pt-20">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <DashboardSidebar />
          
          <main className="flex-1 p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
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