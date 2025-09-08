import { useState } from "react";
import { XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubscriptionModal } from "./SubscriptionModal";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

export function SubscriptionBanner() {
  const { isActive, isLoading } = useSubscriptionStatus();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem('subscriptionBannerDismissed') === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('subscriptionBannerDismissed', 'true');
  };

  // Don't show banner if loading, user is active, or banner is dismissed
  if (isLoading || isActive || isDismissed) {
    return null;
  }

  return (
    <>
      <div className="sticky top-20 z-40 bg-app-canvas border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Status and copy */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600" aria-live="polite">
                  <XCircle className="w-4 h-4" />
                  Inactive
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Activate to unlock automated outreach & placements.
              </p>
            </div>

            {/* Right side - CTA and dismiss */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSubscriptionModal(true)}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shimmer"></div>
                Activate your plan
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground p-2"
                aria-label="Dismiss upgrade banner"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </>
  );
}