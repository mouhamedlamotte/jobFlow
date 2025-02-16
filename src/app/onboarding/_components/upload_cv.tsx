"use client";

import React, { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { FileUpload } from "@/app/_components/ui/file-upload";
import { useOnboardingStore } from "../_stores/useOnboardingStore";
import { useAction } from "next-safe-action/hooks";
import { uploadFile } from "../mutations/upload-cv";
import { useSession } from "next-auth/react";

export const UploadCv = () => {
  const { setStep, setCvFile } = useOnboardingStore();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {data:session} = useSession();

  // Use the `useAction` hook to handle the file upload
  const { execute, status } = useAction(uploadFile, {
    onSuccess: (data) => {
      console.log("File uploaded successfully:", data);
      setCvFile(file); // Save the file URL to the store
      setStep(3); // Move to the next step
    },
    onError: (error) => {
      console.error("Failed to upload file:", error);
      alert("Failed to upload file. Please try again.");
    },
  });

  const handleChange = (file: File[]) => {
    setFile(file[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Convert the file to a base64 string
      const fileData = await file.arrayBuffer().then((buffer) => {
        const base64 = Buffer.from(buffer).toString("base64");
        return base64;
      });

      // Execute the file upload action
      execute({
        fileName: file.name,
        fileData: fileData,
        userId: session?.user?.id as string , // Replace with the actual user ID from the session
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="w-full mx-auto min-h-96 border border-dashed rounded-lg">
        <FileUpload onChange={handleChange} />
      </div>
      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
          <Button
            onClick={() => setFile(null)}
            variant="outline"
            className="mt-2"
          >
            Remove
          </Button>
        </div>
      )}
      <Button type="submit" disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Next"}
      </Button>
    </form>
  );
};