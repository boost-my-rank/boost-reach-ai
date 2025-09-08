import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionStatus {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useSubscriptionStatus(): SubscriptionStatus {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsActive(false);
          return;
        }

        // Use user_info table payment_status
        const { data: userInfo, error: userInfoError } = await supabase
          .from('user_info')
          .select('payment_status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (userInfoError) {
          console.error('Error fetching user info:', userInfoError);
          setError(userInfoError.message);
          setIsActive(false);
          return;
        }

        setIsActive(userInfo?.payment_status === 'active');
      } catch (err) {
        console.error('Subscription status error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription status');
        setIsActive(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  return { isActive, isLoading, error };
}