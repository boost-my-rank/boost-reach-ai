import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SubscriptionModal } from "./SubscriptionModal";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

export function PlanStatusCard() {
  const { isActive, isLoading } = useSubscriptionStatus();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <section className="relative rounded-2xl border bg-card shadow-sm">
        <div className="p-5 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side - Label and status pill */}
            <div className="flex items-center gap-3">
              <Label className="text-sm font-medium leading-none">Plan status</Label>
              {isActive ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  <XCircle className="w-4 h-4" />
                  Inactive
                </span>
              )}
            </div>

            {/* Right side - CTA (only when inactive) */}
            {!isActive && (
              <Button
                onClick={() => setShowSubscriptionModal(true)}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shimmer"></div>
                Activate your plan
              </Button>
            )}
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