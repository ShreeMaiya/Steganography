import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stego-background to-stego-accent/5">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto">
          <Logo />
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Hero onGetStarted={handleGetStarted} />
        <Features />
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-stego-accent/5 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stego-primary/5 rounded-full blur-3xl animate-spin-slow" />
      </div>
    </div>
  );
};

export default Landing;