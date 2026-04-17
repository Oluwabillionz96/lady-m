import { CloudinaryUploadOptions, CloudinaryUploadResult } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});





/**
 * Upload image to Cloudinary with optimization
 */
export async function uploadImage(
  file: Buffer | string,
  options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const {
    folder = "lady-m-portfolio",
    transformation = [],
    quality = "auto"
  } = options;

  try {
    let uploadInput: string;
    
    // Convert Buffer to base64 data URL if needed
    if (Buffer.isBuffer(file)) {
      uploadInput = `data:image/jpeg;base64,${file.toString('base64')}`;
    } else {
      uploadInput = file;
    }

    const result = await cloudinary.uploader.upload(uploadInput, {
      folder,
      quality,
      // Remove invalid transformations
      transformation: transformation.length > 0 ? transformation : undefined,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Upload gallery photo with specific transformations
 */
export async function uploadGalleryPhoto(file: Buffer | string) {
  return uploadImage(file, {
    folder: 'lady-m-portfolio/gallery',
    transformation: [
      { width: 1200, height: 800, crop: 'limit' }
    ]
  });
}

/**
 * Upload testimonial photo with circular crop
 */
export async function uploadTestimonialPhoto(file: Buffer | string) {
  return uploadImage(file, {
    folder: 'lady-m-portfolio/testimonials',
    transformation: [
      { width: 200, height: 200, crop: 'fill', gravity: 'face' },
      { radius: 'max' }
    ]
  });
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Generate optimized URL with transformations
 */
export function generateOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string {
  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    format,
    secure: true
  });
}

/**
 * Validate file type and size
 */
// export function validateImageFile(file: File): { valid: boolean; error?: string } {
//   // Check file type
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   if (!allowedTypes.includes(file.type)) {
//     return {
//       valid: false,
//       error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.'
//     };
//   }

//   // Check file size (max 10MB)
//   const maxSize = 10 * 1024 * 1024; // 10MB in bytes
//   if (file.size > maxSize) {
//     return {
//       valid: false,
//       error: 'File size too large. Maximum size is 10MB.'
//     };
//   }

//   return { valid: true };
// }

/**
 * Convert File to Buffer for upload
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export default cloudinary
