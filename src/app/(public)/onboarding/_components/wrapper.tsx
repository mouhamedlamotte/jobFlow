"use client";
import { Card, CardHeader } from "@/app/_components/ui/card";
import React from "react";
import { useOnboardingStore } from "../_stores/useOnboardingStore";
import { Progress } from "@/app/_components/ui/progress";
import { Button } from "@/app/_components/ui/button";
import { PersonalInfo } from "./personal_info";
import { UploadCv } from "./upload_cv";
import EmailConfig from "./email_config";
import { Finalisation } from "./finalisation";

const OnboardingWrapper = () => {
  const OnboadingState = useOnboardingStore();

  const renderForm = () => {
    switch (OnboadingState.step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <UploadCv />;
      case 3:
        return <EmailConfig />;
      default:
        return <Finalisation />;
    }
  };
  return (
    <div className="mx-auto w-full max-w-5xl py-20">
        <div className="flex items-center justify-between mb-4">

      <h1 className="mb-6 text-2xl font-bold">{OnboadingState.name}</h1>
      <Button variant="ghost"
        disabled={OnboadingState.skipable}
      >
        Skip
      </Button>
        </div>
      <Progress value={100 * (OnboadingState.step / 4)} />
      <div className="mt-4">
      {renderForm()}
      </div>
    </div>
  );
};

export default OnboardingWrapper;
