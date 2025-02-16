import { Skeleton } from "@/app/_components/ui/skeleton";

export const UserFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Submit Button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
