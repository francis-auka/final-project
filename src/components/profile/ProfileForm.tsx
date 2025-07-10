
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadProfilePicture } from "@/utils/fileUpload";
import { useToast } from "@/hooks/use-toast";
import { profileUpdateLimiter, fileUploadLimiter } from "@/utils/rateLimiter";
import { validateProfileData } from "@/utils/inputSanitizer";
import { ProfileFormFields } from "./ProfileFormFields";
import { ProfileImageUpload } from "./ProfileImageUpload";

interface ProfileData {
  name: string;
  email: string;
  age: string;
  phone: string;
  school: string;
  course: string;
  year: string;
  sex: string;
  profilePicUrl: string;
  trustScore: number;
}

interface ProfileFormProps {
  userData: ProfileData;
  setUserData: (data: ProfileData) => void;
  onSave: (profilePicUrl?: string) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  userId: string;
}

const ProfileForm = ({ 
  userData, 
  setUserData, 
  onSave, 
  onCancel, 
  isLoading,
  userId 
}: ProfileFormProps) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateProfileData(userData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
      return;
    }
    
    setValidationErrors({});
    
    // Check rate limiting for profile updates
    if (!profileUpdateLimiter.isAllowed(userId)) {
      const remainingTime = Math.ceil(profileUpdateLimiter.getRemainingTime(userId) / 1000 / 60);
      toast({
        title: "Too many updates",
        description: `Please wait ${remainingTime} minutes before updating again`,
        variant: "destructive",
      });
      return;
    }
    
    let updatedProfilePicUrl = userData.profilePicUrl;
    
    if (profilePic) {
      // Check rate limiting for file uploads
      if (!fileUploadLimiter.isAllowed(userId)) {
        const remainingTime = Math.ceil(fileUploadLimiter.getRemainingTime(userId) / 1000);
        toast({
          title: "Upload limit exceeded",
          description: `Please wait ${remainingTime} seconds before uploading again`,
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      try {
        const uploadResult = await uploadProfilePicture(profilePic, userId);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error);
        }
        
        updatedProfilePicUrl = uploadResult.filePath || userData.profilePicUrl;
      } catch (error: any) {
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      } finally {
        setIsUploading(false);
      }
    }
    
    // Update user data with sanitized values
    const updatedData = { ...userData, ...validation.sanitizedData };
    setUserData(updatedData);
    
    await onSave(updatedProfilePicUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileFormFields 
        userData={userData}
        setUserData={setUserData}
        errors={validationErrors}
      />
      
      <ProfileImageUpload
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        currentImageUrl={userData.profilePicUrl}
      />
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button 
          type="button"
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading || isUploading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isLoading || isUploading}
        >
          {(isLoading || isUploading) ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
