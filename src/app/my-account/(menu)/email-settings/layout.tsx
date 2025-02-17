"use client";

import React from "react";
import { SettingsNav } from "./_components/sideNav";
import { SendTestEmail } from "./_components/sent_test_email";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Configurer les paramètres d&apos;email</h1>
        <SendTestEmail/>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mt-6">
        <SettingsNav />
        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
