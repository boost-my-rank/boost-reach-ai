import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => {
  const steps = [
    {
      number: 1,
      title: "Provide Your Info",
      description: "Give us your name, website, and bio that journalists will use to credit you."
    },
    {
      number: 2,
      title: "Pay and we start working",
      description: "Paying activates your personas and we start reaching out to journalists seeking your expertise immediately."
    },
    {
      number: 3,
      title: "Get Your Monthly Report",
      description: "At month end, receive a detailed backlink report. If we can't provide at least 3 new article backlinks, you can request for your money back."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl w-full mx-auto bg-white border border-slate-200 rounded-xl shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">
              How does it work?
            </h2>
          </div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row items-start justify-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-16 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 text-center relative">
                {/* Step number */}
                <div className="relative mb-6">
                  <div className="w-12 h-12 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto text-lg font-semibold text-slate-700">
                    {step.number}
                  </div>
                  
                  {/* Connector line - only show between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 border-t-2 border-dashed border-slate-300 transform -translate-y-0.5" 
                         style={{ left: 'calc(50% + 24px)', width: 'calc(100% - 24px)' }}>
                    </div>
                  )}
                </div>

                {/* Step content */}
                <div className="max-w-sm mx-auto">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="text-center">
            <Button 
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-medium rounded-lg"
            >
              Start configuring →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};