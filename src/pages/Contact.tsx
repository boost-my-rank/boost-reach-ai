import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { UnifiedHeader } from "@/components/UnifiedHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    topic: "",
    message: "",
    email: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const topicOptions = [
    { value: "pre-sale", label: "I have a pre-sale question" },
    { value: "account-help", label: "I need help with my account" },
    { value: "billing", label: "Billing question" },
    { value: "bug-report", label: "Report a bug" },
    { value: "other", label: "Other" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.topic) {
      newErrors.topic = "Please select what you need help with";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your question";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const { data, error } = await supabase.functions.invoke('submit-contact-form', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      setSubmitError('Failed to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitError("");
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Contact Us</title>
          <meta name="description" content="Get help from our support team." />
          <link rel="canonical" href={`${window.location.origin}/contact`} />
        </Helmet>
        
        <div className="min-h-screen flex flex-col">
          <UnifiedHeader />
          
          <main className="flex-1 relative" style={{ backgroundColor: '#F8FAFC' }}>
            {/* Subtle vignette glow */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(80% 40% at 50% 0%, rgba(15,23,42,0.06), transparent 60%)'
              }}
            />
            
            <div className="relative py-18 sm:py-24 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-[800px]">
                <div 
                  className="bg-white rounded-xl p-6 sm:p-8"
                  style={{
                    border: '1px solid rgba(15,23,42,0.06)',
                    boxShadow: '0 30px 60px -15px rgba(15,23,42,0.15), 0 0 0 1px rgba(15,23,42,0.02)'
                  }}
                >
                  <div className="text-center py-12" role="status" aria-live="polite">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Thanks!</h2>
                    <p className="text-slate-600 mb-6">
                      We received your message and will reply in less than 24 hours.
                    </p>
                    <Button 
                      onClick={handleRetry}
                      variant="outline"
                      className="text-slate-700 border-slate-300 hover:bg-slate-50"
                    >
                      Send another message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Get help from our support team." />
        <link rel="canonical" href={`${window.location.origin}/contact`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <UnifiedHeader />
        
        <main className="flex-1 relative" style={{ backgroundColor: '#F8FAFC' }}>
          {/* Subtle vignette glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(80% 40% at 50% 0%, rgba(15,23,42,0.06), transparent 60%)'
            }}
          />
          
          <div className="relative py-18 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-16">
              {/* Eyebrow */}
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-slate-600 uppercase tracking-wider bg-slate-100 rounded-full">
                SUPPORT
              </div>
              
              {/* H1 */}
              <h1 
                className="font-extrabold text-slate-900 mb-6"
                style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '900',
                  letterSpacing: '-0.02em'
                }}
              >
                Friendly humans, ready to help
              </h1>
              
              {/* Subtext */}
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Get help and questions answered by our friendly support team.
              </p>
              
              {/* Info band */}
              <div 
                className="bg-white rounded-lg p-6 mb-12 max-w-3xl mx-auto"
                style={{
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 4px 12px -4px rgba(15,23,42,0.08)'
                }}
              >
                <p className="text-slate-600 leading-relaxed">
                  For pre-sales questions, existing customers who need help, or other inquiries, 
                  contact us and we'll typically get back to you in less than 24 hours. 
                  Search the <span className="text-slate-900">Help Desk</span> or send us a message to get help.
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="mx-auto max-w-[800px]">
              <div 
                className="bg-white rounded-xl p-6 sm:p-8"
                style={{
                  border: '1px solid rgba(15,23,42,0.06)',
                  boxShadow: '0 30px 60px -15px rgba(15,23,42,0.15), 0 0 0 1px rgba(15,23,42,0.02)'
                }}
              >
                {submitError && (
                  <div 
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-red-800 mb-1">Error</h3>
                        <p className="text-sm text-red-700">{submitError}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRetry}
                        className="text-red-700 border-red-300 hover:bg-red-50"
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Select */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="topic" className="text-sm font-medium text-slate-900">
                        What do you need help with?
                      </Label>
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-400 text-black rounded">
                        Required
                      </span>
                    </div>
                    <Select 
                      value={formData.topic} 
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, topic: value }));
                        if (errors.topic) setErrors(prev => ({ ...prev, topic: "" }));
                      }}
                    >
                      <SelectTrigger 
                        id="topic"
                        className={`w-full ${errors.topic ? 'border-red-300 focus:border-red-500' : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.topic}
                        aria-describedby={errors.topic ? 'topic-error' : undefined}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {topicOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.topic && (
                      <p id="topic-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.topic}
                      </p>
                    )}
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="message" className="text-sm font-medium text-slate-900">
                        What's your question?
                      </Label>
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-400 text-black rounded">
                        Required
                      </span>
                    </div>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                      }}
                      className={`min-h-[150px] ${errors.message ? 'border-red-300 focus:border-red-500' : ''}`}
                      placeholder="Please describe your question or issue in detail..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-900">
                        What's your email address?
                      </Label>
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-400 text-black rounded">
                        Required
                      </span>
                    </div>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      className={errors.email ? 'border-red-300 focus:border-red-500' : ''}
                      placeholder="jane@acme.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* reCAPTCHA Placeholder */}
                  <div className="pt-4 pb-2">
                    <div className="bg-gray-50 border border-gray-200 rounded p-4 text-center">
                      <p className="text-sm text-gray-600">
                        {/* TODO: Integrate reCAPTCHA or hCaptcha */}
                        <span className="text-gray-400">[ Captcha placeholder - to be implemented ]</span>
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 text-base"
                    style={{ minHeight: '48px' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending message...
                      </>
                    ) : (
                      'Send message'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}