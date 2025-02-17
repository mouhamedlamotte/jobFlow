import React from 'react'
import SmtpForm from '../_components/smtp_form'
import { getStmpConfig } from '@/app/my-account/_queries/get-user-email-config'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

const SmtpConfig =  async () => {
    const session  = await auth()
  
    if (!session?.user.id) {
      redirect("/unauthorized")
    }
  
    const smtpConfig = await getStmpConfig(session?.user.id, true);
  
  return (
    <SmtpForm initialValues={{
      smtpServer: smtpConfig?.smtp_server ?? "",
      smtpPort: smtpConfig?.smtp_port ?? "",
      smtpEmail: smtpConfig?.smtp_email ?? "",
      smtpPassword: smtpConfig?.hased_smtp_password ?? "",
    }} />
  )
}

export default SmtpConfig