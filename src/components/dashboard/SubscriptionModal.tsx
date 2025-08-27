import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [isLoading, setIsLoading] = useState(false);

  const monthlyPrice = 249;
  const annualPrice = Math.round(monthlyPrice * 0.8 * 12); // 20% discount
  const annualMonthlyEquivalent = Math.round(monthlyPrice * 0.8);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          seats: 1,
          billingCycle 
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Activate your plan
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Plan Summary */}
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium text-gray-900">Standard (Solo)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Seats</span>
              <span className="font-medium text-gray-900">1 account</span>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <RadioGroup
              value={billingCycle}
              onValueChange={(value) => setBillingCycle(value as 'annual' | 'monthly')}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual" className="flex items-center gap-2 cursor-pointer">
                  Billed Annually
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    SAVE 20%
                  </Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="cursor-pointer">
                  Billed Monthly
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price Display */}
          <div className="text-center py-4">
            {billingCycle === 'annual' ? (
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  ${annualMonthlyEquivalent} / month
                </div>
                <div className="text-sm text-gray-500">
                  billed annually (${annualPrice}/year)
                </div>
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">
                ${monthlyPrice} / month
              </div>
            )}
          </div>

          {/* Trust Row */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-3 h-3" />
            <span>Secured by Stripe. Cancel anytime.</span>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full mt-4 bg-warning hover:bg-warning/90 text-warning-foreground font-medium py-2.5 rounded-md"
          >
            {isLoading ? "Loading..." : "Go to checkout"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}