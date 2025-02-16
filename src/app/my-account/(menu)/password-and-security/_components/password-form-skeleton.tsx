import { Skeleton } from "@/app/_components/ui/skeleton";

export const PasswordFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Current Password Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* New Password Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
