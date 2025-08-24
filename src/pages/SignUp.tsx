import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Get 3 backlinks from high domain authority websites per month",
    "Access to 50k+ verified media contacts",
    "Try free trial providing 1 FREE backlink to start"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-lg font-bold text-primary hover:text-primary/80 transition-colors"
          >
            BoostMyRank
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
          {/* Left Side - Benefits */}
          <div className="lg:w-1/2 bg-card border border-border rounded-lg p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              Start building authority with premium backlinks
            </h1>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Loved by hundreds of organizations, big and small</p>
              <div className="flex items-center gap-4 text-xs opacity-60">
                <span>Forbes</span>
                <span>Yahoo</span>
                <span>CNN</span>
                <span>Newsweek</span>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up */}
          <div className="lg:w-1/2 bg-card border border-border rounded-lg p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Start a free trial
              </h2>
              <p className="text-muted-foreground">
                Get your first backlink free and see the BoostMyRank difference
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">OR CONTINUE WITH</p>
              </div>

              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="w-full h-12 border-2 hover:bg-accent/50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Signing up..." : "Google"}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By clicking continue, you agree to our{" "}
                <a 
                  href="/terms" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;