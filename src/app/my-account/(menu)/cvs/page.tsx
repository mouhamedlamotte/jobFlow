import React from "react";
import { CVManagement } from "../personal-details/_components/cv-management";
import { redirect } from "next/navigation";
import { getUserById } from "../../_queries/get-user-by-id";
import { GetUserCv } from "../../_queries/get-users-cv";
import { auth } from "@/server/auth";
import { UserCV } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import UploadCVButton from "./_components/upload_cv";

const Mycvs = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/unauthorized");
  }
  const cvs = await GetUserCv(session.user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Mes Cvs</h1>
          <p className="text-muted-foreground">
            {session.user.name ?? session?.user.email}
          </p>
        </div>
        <UploadCVButton
          disabled={cvs && cvs?.length >= 3 ? true : false}
        />
      </div>

      <CVManagement initialCVs={cvs as unknown as UserCV[]} />
    </div>
  );
};

export default Mycvs;
