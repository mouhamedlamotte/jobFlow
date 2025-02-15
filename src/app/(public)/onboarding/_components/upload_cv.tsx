"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/app/_components/ui/button"
import { FileUploader } from "react-drag-drop-files"
import { useOnboardingStore } from "../_stores/useOnboardingStore"
import { FileUpload } from "@/app/_components/ui/file-upload"

export const UploadCv = () => {
  const { setStep, setCvFile } = useOnboardingStore()
  const [file, setFile] = useState<File[] | null>([]);

  const handleChange = (file: File[]) => {
    setFile(file)
    setCvFile(file[0])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      setStep(3)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
    <div className="w-full  mx-auto min-h-96 border border-dashed  rounded-lg">
      <FileUpload onChange={handleChange} />
    </div>
      {file  && file.length > 0 && (
        <div className="mt-4">
          <p>Selected file: {file[0]?.name}</p>
          <Button onClick={() => setFile(null)} variant="outline" className="mt-2">
            Remove
          </Button>
        </div>
      )}
      <Button type="submit" disabled={!file}>
        Next
      </Button>
    </form>
  )
}

