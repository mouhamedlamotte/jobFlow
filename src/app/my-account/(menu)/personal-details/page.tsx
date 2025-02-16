import { auth } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserById } from "../../_queries/get-user-by-id";
import { PersonalInfoForm } from "./_components/user-form";
import { UserFormSkeleton } from "./_components/user-form-skeleton";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/unauthorized");
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold">Informations personnelles</h1>
      </div>

      <div className="border rounded-md p-4 max-w-screen-sm mt-4">
        <Suspense fallback={<UserFormSkeleton />}>
          <PersonalInfoForm initialData={user} />
        </Suspense>
      </div>
    </div>
  );
}
