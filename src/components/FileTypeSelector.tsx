import { Image, Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type FileType = "image" | "audio" | "video";

interface FileTypeSelectorProps {
  selectedType: FileType;
  onTypeSelect: (type: FileType) => void;
}

export const FileTypeSelector = ({
  selectedType,
  onTypeSelect,
}: FileTypeSelectorProps) => {
  const types = [
    { id: "image" as FileType, icon: Image, label: "Image" },
    { id: "audio" as FileType, icon: Music, label: "Audio" },
    { id: "video" as FileType, icon: Video, label: "Video" },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTypeSelect(id)}
          className={cn(
            "flex flex-col items-center p-4 rounded-lg transition-all duration-300",
            "hover:bg-stego-accent/10 hover:scale-105 transform",
            selectedType === id
              ? "bg-stego-accent/20 text-stego-accent scale-105"
              : "text-stego-muted"
          )}
        >
          <Icon className="w-8 h-8 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};