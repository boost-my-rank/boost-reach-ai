import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png"; // Update this path to your logo file

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  // { label: "Free SEO Report", href: "/resources/seo-2025-backlink-report" },
];

export function UnifiedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  useEffect(() => {
    // Check current auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-4">
          <nav className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={logoImage} 
                  alt="BoostMyRank Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold text-foreground">BoostMyRank</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo - flush left */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logoImage} 
                alt="BoostMyRank Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-foreground">BoostMyRank</span>
            </Link>
          </div>

          {/* Centered Navigation - matches hero content width */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center justify-center space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Button variant="cta" size="sm" className="cta-shimmer" asChild>
                  <Link to="/signup">Try it now</Link>
                </Button>
              </>
            ) : (
              <div />
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="px-4 space-y-4 p-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {!isSignedIn && (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="justify-start">
                    Sign in
                  </Button>
                </Link>
                <Button variant="cta" size="sm" className="cta-shimmer" asChild>
                  <Link to="/signup">Try it now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}