import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Check } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface AuthFormProps {
  mode: "signup" | "signin";
  onSuccessRedirect?: string;
  showTerms?: boolean;
  showForgotPassword?: boolean;
}

const AuthForm = ({ 
  mode, 
  onSuccessRedirect = "/dashboard",
  showTerms = false,
  showForgotPassword = false 
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${onSuccessRedirect}`
          }
        });

        if (error) {
          setError(error.message);
          setShowSuccess(false);
        } else {
          setShowSuccess(true);
          // Optional analytics event
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'signup_success_banner_shown', {
              method: 'email'
            });
          }
          toast({
            title: "Check your email",
            description: "We sent you a confirmation link to complete your signup.",
          });
          
          // For new signups, redirect immediately to dashboard after email confirmation
          // The emailRedirectTo already points to dashboard for new users
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else {
          navigate(onSuccessRedirect);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setShowSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${onSuccessRedirect}`
        }
      });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const benefits = [
    "Get 3 backlinks from high domain authority websites per month",
    "Access to 50k+ verified media contacts",
    "Try free trial providing 1 FREE backlink to start"
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full">
      {/* Left Side - Benefits */}
      <div className="lg:w-1/2 lg:pr-4">
        <h1 className="text-4xl font-semibold text-slate-900 mb-6 leading-tight">
          Start building authority with premium backlinks
        </h1>
        
        <div className="space-y-5 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center mt-0.5 flex-shrink-0">
                <CheckCircle className="h-3 w-3 text-yellow-900" />
              </div>
              <span className="text-slate-600 text-lg leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="space-y-4">
          <p className="text-slate-500 text-sm">Loved by hundreds of organizations, big and small</p>
          <div className="flex items-center gap-6 opacity-40">
            <span className="text-slate-600 font-medium text-sm">Forbes</span>
            <span className="text-slate-600 font-medium text-sm">Yahoo</span>
            <span className="text-slate-600 font-medium text-sm">CNN</span>
            <span className="text-slate-600 font-medium text-sm">Newsweek</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span className="font-medium">Capterra</span>
              <span>4.9/5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">GetApp</span>
              <span>4.9/5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Software Advice</span>
              <span>4.9/5</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="lg:w-1/2 bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            {mode === "signup" ? "Sign up" : "Sign in"}
          </h2>
          {error && !showSuccess && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
          {showSuccess && mode === "signup" && (
            <div 
              role="status" 
              aria-live="polite"
              className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
            >
              <Check className="h-4 w-4 text-green-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-green-700 text-sm leading-relaxed">
                <span className="font-medium">Success!</span> Thanks for signing up! Please check your email to confirm your account.
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleEmailPasswordSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                aria-describedby="email-error"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                aria-describedby="password-error"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
          >
            {isLoading ? "Loading..." : (mode === "signup" ? "Sign up" : "Sign in")}
          </Button>

          {showForgotPassword && mode === "signin" && (
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-slate-600 hover:text-slate-900 underline"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </form>

        <div className="space-y-6 mt-6">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500 font-medium">OR CONTINUE WITH</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading}
            type="button"
            className="w-full h-14 flex items-center justify-center gap-3 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 hover:border-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-slate-700 font-medium">
              {isGoogleLoading ? "Loading..." : "Google"}
            </span>
          </button>

          {showTerms && (
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              By clicking continue, you agree to our{" "}
              <a 
                href="/terms" 
                className="text-slate-700 hover:text-slate-900 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;