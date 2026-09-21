import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "./config";
import { MAX_PHOTO_SIZE, MAX_MUSIC_SIZE, ALLOWED_IMAGE_TYPES, ALLOWED_MUSIC_TYPES } from "@/lib/constants";

// ---- Upload Photo ----
export async function uploadPhoto(
  file: File,
  path: string
): Promise<string> {
  // Validate file
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
  }
  if (file.size > MAX_PHOTO_SIZE) {
    throw new Error("Ukuran file terlalu besar. Maksimal 5MB.");
  }

  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

// ---- Upload Music ----
export async function uploadMusic(
  file: File,
  path: string
): Promise<string> {
  if (!ALLOWED_MUSIC_TYPES.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan MP3 atau WAV.");
  }
  if (file.size > MAX_MUSIC_SIZE) {
    throw new Error("Ukuran file terlalu besar. Maksimal 10MB.");
  }

  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

// ---- Upload Invitation Photo ----
export async function uploadInvitationPhoto(
  file: File,
  userId: string,
  invitationId: string,
  fileName: string
): Promise<string> {
  const path = `invitations/${userId}/${invitationId}/photos/${fileName}`;
  return uploadPhoto(file, path);
}

// ---- Upload Gallery Photo ----
export async function uploadGalleryPhoto(
  file: File,
  userId: string,
  invitationId: string,
  index: number
): Promise<string> {
  const extension = file.name.split(".").pop();
  const path = `invitations/${userId}/${invitationId}/gallery/photo_${index}.${extension}`;
  return uploadPhoto(file, path);
}

// ---- Upload Invitation Music ----
export async function uploadInvitationMusic(
  file: File,
  userId: string,
  invitationId: string
): Promise<string> {
  const extension = file.name.split(".").pop();
  const path = `invitations/${userId}/${invitationId}/music/bgm.${extension}`;
  return uploadMusic(file, path);
}

// ---- Upload Template Thumbnail ----
export async function uploadTemplateThumbnail(
  file: File,
  templateId: string
): Promise<string> {
  const path = `templates/${templateId}/thumbnail.${file.name.split(".").pop()}`;
  return uploadPhoto(file, path);
}

// ---- Delete File ----
export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  try {
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// ---- Delete Invitation Files ----
export async function deleteInvitationFiles(
  userId: string,
  invitationId: string
): Promise<void> {
  const folderRef = ref(storage, `invitations/${userId}/${invitationId}`);
  try {
    const list = await listAll(folderRef);
    const deletePromises = list.items.map((item) => deleteObject(item));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting invitation files:", error);
  }
}
