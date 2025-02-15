"use server";

import { put } from "@vercel/blob";

export const uploadDataUrlFile = async (filename: string, dataUrl: string) => {
  const base64Data = dataUrl.split(",")[1]; 
  const binaryData = Buffer.from(base64Data, "base64"); 

  // Envoyer les données brutes
  const { url } = await put(filename, binaryData, { access: "public" });
  return url;
};


export const uploadFile = async (file: File, bucketName?: string) => {
  const { url } = await put(`${bucketName}/${file.name}`, file, { access: "public" });
  return url;
}