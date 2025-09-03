import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main role="main" className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-12 text-center space-y-6">
          <h1 className="text-8xl font-bold text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">
            Oops. The page you were looking for doesn't exist.
          </p>
          <Button 
            variant="cta" 
            size="lg" 
            onClick={handleGoHome}
            aria-label="Go back home"
            className="w-full"
          >
            Go back home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default NotFound;
