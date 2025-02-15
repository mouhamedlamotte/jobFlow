import { auth } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserById } from "../_queries/get-user-by-id";
import { UserForm } from "./_components/user-form";
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
        <h1 className="text-3xl font-extrabold">Personal Details</h1>
      </div>

      <div className="border rounded-md p-4 max-w-screen-sm">
        <Suspense fallback={<UserFormSkeleton />}>
          <UserForm initialData={user} />
        </Suspense>
      </div>
    </div>
  );
}
