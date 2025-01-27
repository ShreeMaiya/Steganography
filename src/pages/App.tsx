import { Steganography } from "@/components/Steganography";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stego-background to-stego-accent/5 p-6">
      {/* Header */}
      <header className="mb-8">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Lock className="w-8 h-8 text-stego-accent" />
            <span className="text-2xl font-bold text-stego-primary">GetStego</span>
          </div>
          <div className="flex gap-6">
            <a href="/" className="text-stego-primary hover:text-stego-accent transition-colors">
              Home
            </a>
            <Dialog>
              <DialogTrigger className="text-stego-primary hover:text-stego-accent transition-colors flex items-center gap-1">
                <Info className="w-4 h-4" />
                About
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">About Steganography</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-left">
                  <p className="text-stego-primary">
                    Steganography is the practice of concealing messages or information within other non-secret data and files. Our application uses several advanced techniques to achieve this:
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stego-primary">Least Significant Bit Method (Image):</h3>
                    <p className="text-stego-muted">
                      For images, we use the LSB technique which modifies the least significant bits of pixel values to embed the secret message. This ensures minimal visual impact on the image while securely hiding data.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stego-primary">Echo Hiding (Audio):</h3>
                    <p className="text-stego-muted">
                      For audio files, we implement echo hiding, which introduces subtle echoes at specific intervals to encode binary data, maintaining audio quality while hiding information.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-stego-primary">Motion Vector Modification (Video):</h3>
                    <p className="text-stego-muted">
                      Video steganography utilizes motion vector modification in the compression process to embed data while preserving video quality and playback smoothness.
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-stego-accent/10 rounded-lg">
                    <p className="text-sm text-stego-primary">
                      All methods include advanced encryption to ensure your messages remain secure and can only be extracted with the correct secret key.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-stego-accent/20">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-stego-primary mb-4 animate-fade-in">
                Encode & Decode Secret Messages
              </h1>
              <p className="text-stego-muted">
                Securely hide your messages within files using advanced steganography
              </p>
            </div>
            
            <Steganography />
          </CardContent>
        </Card>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-stego-accent/5 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stego-primary/5 rounded-full blur-3xl animate-spin-slow" />
      </div>
    </div>
  );
};

export default Index;