import { useState, useCallback } from "react";
import { FileTypeSelector } from "./FileTypeSelector";
import { FileUpload } from "./FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, Download, Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FileType = "image" | "audio" | "video";
type Mode = "encode" | "decode";

const ACCEPTED_TYPES = {
  image: "image/*",
  audio: "audio/*",
  video: "video/*",
};

const isValidKey = (key: string) => {
  return /^[a-zA-Z0-9]{1,8}$/.test(key);
};

interface EncodedData {
  message: string;
  keyHash: string;
}

const hashKey = (key: string): string => {
  return key.split('').reduce((hash, char) => 
    (((hash << 5) - hash) + char.charCodeAt(0)) | 0, 0
  ).toString();
};

const encryptMessage = (message: string, key: string): EncodedData => {
  const encrypted = message.split('').map((char, i) => {
    const keyChar = key.charCodeAt(i % key.length);
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
  }).join('');

  return {
    message: encrypted,
    keyHash: hashKey(key)
  };
};

const decryptMessage = (encoded: EncodedData, key: string): string => {
  if (hashKey(key) !== encoded.keyHash) {
    throw new Error('Key mismatch');
  }

  return encoded.message.split('').map((char, i) => {
    const keyChar = key.charCodeAt(i % key.length);
    return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
  }).join('');
};

// Helper functions to handle file data
const appendDataToFile = async (file: File, data: EncodedData): Promise<Blob> => {
  const fileContent = await file.arrayBuffer();
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));
  
  // Combine original file and encoded data
  return new Blob([fileContent, encodedData], { type: file.type });
};

const extractDataFromFile = async (file: File): Promise<EncodedData> => {
  const fileContent = await file.arrayBuffer();
  const decoder = new TextDecoder();
  const content = decoder.decode(fileContent);
  
  try {
    // Find the JSON data at the end of the file
    const lastBraceIndex = content.lastIndexOf('}');
    const jsonData = content.substring(content.lastIndexOf('{'), lastBraceIndex + 1);
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error('No encoded message found in file');
  }
};

export const Steganography = () => {
  const [fileType, setFileType] = useState<FileType>("image");
  const [mode, setMode] = useState<Mode>("encode");
  const [file, setFile] = useState<File | null>(null);
  const [secretMessage, setSecretMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDecodedMessage, setShowDecodedMessage] = useState(false);
  const [keyError, setKeyError] = useState<string>("");
  const [decodedMessage, setDecodedMessage] = useState<string>("");
  const { toast } = useToast();

  const handleProcess = useCallback(async () => {
    if (!isValidKey(secretKey) || !file) {
      toast({
        title: "Invalid key",
        description: "Key must be 1-8 alphanumeric characters",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (mode === "decode") {
        try {
          const encodedData = await extractDataFromFile(file);
          const decrypted = decryptMessage(encodedData, secretKey);
          setDecodedMessage(decrypted);
          setShowDecodedMessage(true);
          
          toast({
            title: "File decoded successfully!",
            description: "The hidden message has been revealed.",
          });
        } catch (error) {
          toast({
            title: "Key mismatch",
            description: "Wrong key or no encoded message found.",
            variant: "destructive",
          });
          setSecretKey("");
          return;
        }
      } else {
        const encodedData = encryptMessage(secretMessage, secretKey);
        const modifiedFile = await appendDataToFile(file, encodedData);
        
        const link = document.createElement("a");
        link.href = URL.createObjectURL(modifiedFile);
        link.download = `encoded_${file.name}`;
        link.click();
        
        toast({
          title: "Message encoded successfully!",
          description: "Your message has been hidden in the file.",
        });

        setFile(null);
        setSecretMessage("");
        setSecretKey("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during processing.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [mode, file, secretMessage, secretKey, toast]);

  const isValid = file && secretKey && (mode === "decode" || secretMessage);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setFile(null);
    setSecretMessage("");
    setSecretKey("");
    setDecodedMessage("");
    if (newMode === "encode") {
      setShowDecodedMessage(false);
    }
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 8); // Restrict to 8 characters
    setSecretKey(value);
    if (value && !isValidKey(value)) {
      setKeyError("Key must be 1-8 alphanumeric characters");
    } else {
      setKeyError("");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => handleModeChange("encode")}
          className="group relative overflow-hidden w-32"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stego-accent to-stego-primary opacity-0 group-hover:opacity-10 transition-opacity" />
          <Lock className="w-4 h-4 mr-2" />
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => handleModeChange("decode")}
          className="group relative overflow-hidden w-32"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stego-accent to-stego-primary opacity-0 group-hover:opacity-10 transition-opacity" />
          <Unlock className="w-4 h-4 mr-2" />
          Decode
        </Button>
      </div>

      <FileTypeSelector selectedType={fileType} onTypeSelect={setFileType} />

      <Card className="overflow-hidden border-stego-accent/20">
        <CardContent className="p-6 space-y-6">
          <FileUpload
            onFileSelect={setFile}
            acceptedTypes={ACCEPTED_TYPES[fileType]}
            selectedFile={file}
          />

          {mode === "encode" && (
            <div className="space-y-4 animate-fade-in">
              <Input
                placeholder="Enter your secret message"
                value={secretMessage}
                onChange={(e) => setSecretMessage(e.target.value)}
                className="border-stego-accent/20 focus:border-stego-accent"
              />
            </div>
          )}

          <Input
            type="password"
            placeholder={mode === "encode" 
              ? "Enter your secret key (1-8 characters)" 
              : "Enter your Secret Key"}
            value={secretKey}
            onChange={handleKeyChange}
            maxLength={8} // Add maxLength prop
            className={`border-stego-accent/20 focus:border-stego-accent ${keyError && "border-red-500"}`}
          />
          {keyError && (
            <p className="text-sm text-red-500 mt-1">{keyError}</p>
          )}

          {mode === "decode" && showDecodedMessage && decodedMessage && (
            <div className="animate-fade-in">
              <Alert className="bg-gradient-to-r from-stego-accent/10 to-stego-primary/10 border-stego-accent/20">
                <MessageSquare className="h-4 w-4" />
                <AlertDescription className="mt-2">
                  <div className="font-medium text-lg text-stego-primary animate-fade-in">
                    Hidden Message:
                  </div>
                  <div className="mt-2 p-4 bg-white/50 rounded-lg shadow-inner animate-scale-in">
                    {decodedMessage}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleProcess}
              disabled={!isValid || isProcessing}
              className="relative overflow-hidden group min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-stego-accent to-stego-primary opacity-0 group-hover:opacity-10 transition-opacity" />
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : mode === "encode" ? (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Encode & Download
                </>
              ) : (
                "Decode Message"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};