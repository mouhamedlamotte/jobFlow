import { auth } from "@/server/auth"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { getUserById } from "../../_queries/get-user-by-id"
import { PersonalInfoForm } from "./_components/user-form"
import { UserFormSkeleton } from "./_components/user-form-skeleton"
import { CVManagement } from "./_components/cv-management"
import { GetUserCv } from "../../_queries/get-users-cv"

type CV = {
  id: string
  cv_filename: string
  cv_url: string
  primary: boolean
  uploaded_at: Date
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user.id) {
    redirect("/unauthorized")
  }

  const user = await getUserById(session.user.id)
  const cvs = await GetUserCv(session.user.id)

  if (!user) {
    return notFound()
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold mb-4">Personal Information</h1>
        <div className="border rounded-md p-4 max-w-screen-sm">
          <Suspense fallback={<UserFormSkeleton />}>
            <PersonalInfoForm initialData={user} />
          </Suspense>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Social Networks</h2>
        <div className="border rounded-md p-4 max-w-screen-sm">
          {/* <SocialLinksForm initialLinks={user.links} /> */}
        </div>
      </div>
    </div>
  )
}

