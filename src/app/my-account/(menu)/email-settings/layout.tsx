import React from "react";
import { SettingsNav } from "./_components/sideNav";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Configurer les paramètres d&apos;email</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mt-6">
        <SettingsNav />
        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
};

export default SettingsLayout;
