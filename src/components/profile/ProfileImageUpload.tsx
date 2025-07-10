
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { validateFileUpload } from "@/utils/inputSanitizer";
import { X, Upload } from "lucide-react";

interface ProfileImageUploadProps {
  profilePic: File | null;
  setProfilePic: (file: File | null) => void;
  currentImageUrl?: string;
}

export const ProfileImageUpload = ({ 
  profilePic, 
  setProfilePic, 
  currentImageUrl 
}: ProfileImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    const validation = validateFileUpload(file);
    
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      return;
    }
    
    setProfilePic(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="space-y-4">
      <Label>Profile Picture</Label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop your image here, or click to browse
        </p>
        
        <Input 
          type="file" 
          accept=".jpg,.jpeg,.png"
          onChange={handleInputChange}
          className="hidden"
          id="profile-upload"
        />
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => document.getElementById('profile-upload')?.click()}
        >
          Choose File
        </Button>
      </div>

      {profilePic && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded">
          <span className="text-sm flex-1">Selected: {profilePic.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setProfilePic(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {currentImageUrl && !profilePic && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded">
          <span className="text-sm">Current profile picture will be kept</span>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        Max file size: 5MB. Supported formats: JPG, PNG
      </p>
    </div>
  );
};
