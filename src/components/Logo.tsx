import { Lock } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-stego-primary group">
      <Lock className="w-8 h-8 transition-transform group-hover:rotate-12" />
      <span className="text-2xl font-semibold tracking-tight">GetStego</span>
    </div>
  );
};