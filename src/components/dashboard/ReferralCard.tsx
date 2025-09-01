import { useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface ReferralCardProps {
  className?: string;
}

export function ReferralCard({ className }: ReferralCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode] = useState("BMR2024"); // Placeholder code
  const { toast } = useToast();

  const handleCopyLink = async () => {
    const referralUrl = `${window.location.origin}/?via=${referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralUrl);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    }
  };

  const handleViewReferrals = () => {
    // Placeholder - would open Rewardful portal
    window.open('#', '_blank');
  };

  if (isLoading) {
    return (
      <div className={`p-3 rounded-lg border bg-card ${className}`}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-3/4 mb-3" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden p-3 rounded-lg border border-purple-200 bg-card shadow-sm ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.02) 0%, rgba(255, 255, 255, 1) 100%)'
      }}
    >
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.1) 50%, transparent 100%)',
          animation: 'shimmer 4s ease-in-out infinite'
        }}
      />
      
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-purple-700 mb-1">
          Earn 30% LIFETIME
        </h3>
        
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Share your referral link with friends and earn 30% of their subscription for as long as they stay.
        </p>
        
        {/* Referral code chip */}
        <div className="mb-3">
          <div className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-purple-50 border border-purple-200 text-purple-800">
            {referralCode}
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={handleCopyLink}
            size="sm"
            className="w-full text-xs h-8 bg-purple-600 hover:bg-purple-700 text-white"
            aria-label="Copy referral link"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy Link
          </Button>
          
          <button
            onClick={handleViewReferrals}
            className="text-xs text-purple-600 hover:text-purple-800 underline-offset-2 hover:underline flex items-center gap-1 mx-auto"
          >
            View your referrals
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}