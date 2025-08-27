import { UnifiedHeader } from "@/components/UnifiedHeader";
import AuthForm from "@/components/auth/AuthForm";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <UnifiedHeader />

      {/* Main Content */}
      <main className="pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
          <AuthForm 
            mode="signin" 
            showForgotPassword={true}
          />
        </div>
      </main>
    </div>
  );
};

export default SignIn;