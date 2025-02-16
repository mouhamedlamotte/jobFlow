"use client";

import { useCvStore } from "../../cvs/stores/useCvStore";
import CvCard from "../../cvs/_components/cvCard";
import { UserCV } from "@prisma/client";
import { useEffect } from "react";
import { Button } from "@/app/_components/ui/button"; // Assuming you're using a UI library for buttons
import { Plus } from "lucide-react"; // Assuming you're using Lucide for icons
import UploadCVButton from "../../cvs/_components/upload_cv";

export const CVManagement = ({ initialCVs }: { initialCVs: UserCV[] }) => {
  const { cvs, setCVs } = useCvStore();

  useEffect(() => {
    setCVs(initialCVs);
  }, [initialCVs, setCVs]);

  // If there are no CVs, display a nice empty state UI
  if (cvs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Vous n&#39;avez pas encore de CV</h2>
          <p className="text-gray-500 mt-2">
            Vous pouvez en ajouter un en cliquant sur le bouton ci-dessous
          </p>
        </div>
        <UploadCVButton disabled={false} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cvs
            .sort((a, b) => Number(b.primary) - Number(a.primary)) // Sort so that primary CVs come first
            .map((cv) => (
              <CvCard cv={cv} key={cv.id} />
            ))}
        </div>
      </div>
    </div>
  );
};