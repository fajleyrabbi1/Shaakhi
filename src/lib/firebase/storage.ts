import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage } from './config';

/**
 * Uploads any file to Firebase Storage at the given path, with optional progress callback.
 */
export function uploadMedia(
  file: File, 
  path: string, 
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Firebase storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          console.error('Firebase storage get download URL error:', error);
          reject(error);
        }
      }
    );
  });
}

/**
 * Uploads post-related media file to `posts/{postId}/{filename}`.
 */
export function uploadPostMedia(
  postId: string, 
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> {
  const extension = file.name.split('.').pop() || '';
  const sanitizedName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
  return uploadMedia(file, `posts/${postId}/${sanitizedName}`, onProgress);
}

/**
 * Uploads user profile photo to `users/{uid}/profile_pic.{extension}`.
 */
export function uploadProfilePhoto(
  uid: string, 
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> {
  const extension = file.name.split('.').pop() || '';
  return uploadMedia(file, `users/${uid}/profile_pic.${extension}`, onProgress);
}

/**
 * Deletes an object from storage by its full download URL.
 */
export async function deleteMedia(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Firebase storage delete media error:', error);
    throw error;
  }
}

/**
 * Retrieves the download URL for a specific storage path.
 */
export async function getMediaUrl(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Firebase storage get media url error:', error);
    throw error;
  }
}
