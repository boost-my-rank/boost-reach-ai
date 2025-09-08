import { useState } from "react";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriptionModal } from "./SubscriptionModal";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function SubscriptionStatusCard() {
  const { isActive, isLoading } = useSubscriptionStatus();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isManagingBilling, setIsManagingBilling] = useState(false);
  const { toast } = useToast();

  const handleManageBilling = async () => {
    setIsManagingBilling(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Unable to open billing portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsManagingBilling(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative rounded-2xl border bg-card shadow-sm">
        {/* Yellow top bar */}
        <div className="absolute left-0 right-0 top-0 h-1.5 rounded-t-2xl bg-yellow-400" />
        
        <div className="p-5 md:p-6 lg:p-8">
          <div className="animate-pulse flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative rounded-2xl border bg-card shadow-sm">
        {/* Yellow top bar */}
        <div className="absolute left-0 right-0 top-0 h-1.5 rounded-t-2xl bg-yellow-400" />
        
        <div className="p-5 md:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Status pill */}
            <div className="flex items-center gap-3">
              {isActive ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Active
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                      <span className="w-2 h-2 border border-gray-400 rounded-full"></span>
                      Inactive
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Right: Action button */}
            <div className="flex items-center">
              {isActive ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleManageBilling}
                  disabled={isManagingBilling}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {isManagingBilling ? "Loading..." : "Manage billing"}
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shimmer"></div>
                  Activate your account
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </>
  );
}