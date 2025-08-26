import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { HowItWorksModal } from "@/components/dashboard/HowItWorksModal";
import { PersonaConfiguration } from "@/components/dashboard/PersonaConfiguration";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

        // Check if this is first visit (show modal)
        const hasSeenModal = localStorage.getItem(`hasSeenModal_${session.user.id}`);
        if (!hasSeenModal) {
          setShowModal(true);
        }
      } catch (error) {
        console.error("Auth error:", error);
        toast({
          title: "Error",
          description: "Failed to verify authentication",
          variant: "destructive",
        });
        navigate("/signup");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/signup");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleModalClose = () => {
    if (user) {
      localStorage.setItem(`hasSeenModal_${user.id}`, "true");
    }
    setShowModal(false);
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-slate-900 mb-8">Dashboard</h1>
            <PersonaConfiguration />
          </div>
        </div>
      </main>

      <HowItWorksModal 
        isOpen={showModal} 
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Dashboard;