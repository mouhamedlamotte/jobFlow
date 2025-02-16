"use client";
import { Card, CardHeader } from "@/app/_components/ui/card";
import React from "react";
import { Progress } from "@/app/_components/ui/progress";
import { Button } from "@/app/_components/ui/button";
import { useSearchParams } from "next/navigation";
import RenderStep from "./render_step";

const OnboardingWrapper = () => {
  const searchParams = useSearchParams()
  const step = searchParams.get("step")
  const name = searchParams.get("name")

  return (
    <div className="mx-auto w-full max-w-5xl py-20">
        <div className="flex items-center justify-between mb-4">

      <h1 className="mb-6 text-2xl font-bold">{name}</h1>
      <Button variant="ghost"
      >
        Skip
      </Button>
        </div>
      <Progress value={100 * (parseInt(step ?? '1') / 4)} />
      <div className="mt-4">
      <RenderStep step={step ?? "1"} />
      </div>
    </div>
  );
};

export default OnboardingWrapper;
