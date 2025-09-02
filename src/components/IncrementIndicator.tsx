import { cn } from "@/lib/utils";

interface IncrementIndicatorProps {
  show: boolean;
  className?: string;
}

export function IncrementIndicator({ show, className }: IncrementIndicatorProps) {
  return (
    <span
      className={cn(
        "absolute -top-1 -right-4 text-sm font-bold text-green-600 transition-all duration-300 pointer-events-none",
        show ? "opacity-100 scale-100" : "opacity-0 scale-75",
        className
      )}
    >
      +1
    </span>
  );
}