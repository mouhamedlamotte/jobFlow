import React from 'react'
import { PersonalInfoForm } from './personal_info';
import { UploadCv } from './upload_cv';
import EmailConfig from './email_config';
import { getUserById } from '@/app/my-account/_queries/get-user-by-id';
import { useSession } from 'next-auth/react';

const RenderStep = ({step} : {step: string}) => {


  const {data: session} =  useSession()

  const user = session?.user as any

    const renderForm = () => {
        switch (step) {
          case '1':
            return <PersonalInfoForm initialData={user} />;
          case '2':
            return <UploadCv />;
          case '3':
            return <EmailConfig />;
          default:
            return  <PersonalInfoForm initialData={user} />;
        }
      };
  return (
    <> {renderForm()} </>
  )
}

export default RenderStep