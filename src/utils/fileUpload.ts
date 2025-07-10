
import { supabase } from "@/integrations/supabase/client";
import { validateFileUpload } from "./inputSanitizer";

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

/**
 * Uploads a profile picture to Supabase storage with enhanced security
 */
export const uploadProfilePicture = async (
  file: File,
  userId: string
): Promise<UploadResult> => {
  try {
    console.log("Starting profile picture upload for user:", userId);
    
    if (!file || !userId) {
      return {
        success: false,
        error: "File and user ID are required"
      };
    }

    // Validate file with security checks
    const validation = validateFileUpload(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", ")
      };
    }

    // Sanitize filename to prevent directory traversal
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const sanitizedFileName = `profile-pic-${timestamp}-${randomSuffix}.${fileExtension}`;
    
    // Create secure file path
    const filePath = `${userId}/profile-pics/${sanitizedFileName}`;

    console.log("Uploading file to path:", filePath);

    // Upload file to storage with security headers
    const { data, error } = await supabase.storage
      .from('public_media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error("Upload error:", error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log("Upload successful:", data);
    
    return {
      success: true,
      filePath: data.path
    };
  } catch (error: any) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error.message || "Upload failed"
    };
  }
};

/**
 * Gets the public URL for an image in storage with error handling
 */
export const getPublicImageUrl = (filePath: string): string => {
  if (!filePath) return "";
  
  try {
    const { data } = supabase.storage
      .from('public_media')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    console.error("Error getting public URL:", error);
    return "";
  }
};

/**
 * Deletes a file from storage with proper error handling
 */
export const deleteFile = async (filePath: string): Promise<boolean> => {
  try {
    if (!filePath) {
      console.warn("No file path provided for deletion");
      return false;
    }

    const { error } = await supabase.storage
      .from('public_media')
      .remove([filePath]);
      
    if (error) {
      console.error("Delete error:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
};
