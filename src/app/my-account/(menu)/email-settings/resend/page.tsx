import React from 'react'
import ResendForm from '../_components/resend_form'
import { getResendConfig } from '@/app/my-account/_queries/get-user-email-config'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

const ResendConfig = async () => {

  const session  = await auth()

  if (!session?.user.id) {
    redirect("/unauthorized")
  }

  const resendConfig = await getResendConfig(session?.user.id, true);


  return (
    <ResendForm initialValues={{
      resendApiKey: resendConfig?.hased_resend_api_key ?? "",
      resendEmail: resendConfig?.resend_email ?? "",
    }} />
  )
}

export default ResendConfig