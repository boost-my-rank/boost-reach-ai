import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HowItWorksModalProps {
  isOpen: boolean;
  onStartConfiguring: () => void;
}

export function HowItWorksModal({ isOpen, onStartConfiguring }: HowItWorksModalProps) {
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
      <DialogContent className="max-w-3xl p-0 gap-0">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              How it works
            </h2>
            <p className="text-slate-600">
              Get started with BoostMyRank in 3 simple steps
            </p>
          </div>

          <div className="space-y-8 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start gap-6">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-16 bg-slate-200 mt-4" 
                         style={{
                           background: 'repeating-linear-gradient(to bottom, #cbd5e1 0, #cbd5e1 4px, transparent 4px, transparent 8px)'
                         }}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={onStartConfiguring}
              size="lg"
              className="px-8"
            >
              Start configuring →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}