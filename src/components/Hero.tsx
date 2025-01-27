import { Button } from "@/components/ui/button";
import { Shield, Key } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Unleash the Power of Steganography!";
  
  // Typewriter effect
  useEffect(() => {
    setIsVisible(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-center max-w-3xl mx-auto mb-16 space-y-8">
      {/* Particle effect background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="particle-container animate-pulse opacity-20" />
      </div>

      {/* Logo and title with animations */}
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Shield className="w-16 h-16 text-stego-accent animate-spin-slow" />
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-stego-primary to-stego-accent bg-clip-text text-transparent">
            GetStego
          </h1>
        </div>
      </div>

      {/* Animated tagline */}
      <h2 className="text-3xl md:text-4xl font-bold text-stego-primary relative">
        <span className="bg-gradient-to-r from-stego-primary via-stego-accent to-stego-primary bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
          {typedText}
        </span>
      </h2>
      
      <p className="text-lg text-stego-muted mb-8 max-w-2xl mx-auto leading-relaxed">
        Embed and extract secret messages within your media files using cutting-edge steganography techniques. 
        Keep your communications private and secure with our advanced encryption technology.
      </p>
      
      {/* Animated CTA button */}
      <Button
        onClick={onGetStarted}
        size="lg"
        className="relative group bg-gradient-to-r from-stego-accent to-stego-primary hover:from-stego-primary hover:to-stego-accent text-white transform transition-all hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <span className="relative z-10 flex items-center gap-2">
          Get Started
          <Key className="w-5 h-5 transition-transform group-hover:rotate-12" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-stego-accent to-stego-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-md blur-lg -z-10" />
      </Button>
    </div>
  );
};