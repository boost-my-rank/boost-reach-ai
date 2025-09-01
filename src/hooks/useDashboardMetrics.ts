import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardMetrics {
  opportunities_today: number;
  journalists_today: number;
  my_pitches_today: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await (supabase as any).rpc('dashboard_metrics_today');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setMetrics(data[0]);
        } else {
          setMetrics({
            opportunities_today: 0,
            journalists_today: 0,
            my_pitches_today: 0
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard metrics:', err);
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
        setMetrics({
          opportunities_today: 0,
          journalists_today: 0,
          my_pitches_today: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, isLoading, error };
}