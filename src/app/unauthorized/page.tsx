import { Button } from "@/app/_components/ui/button";
import { H1 } from "@/app/_components/ui/headings";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <H1 className="mb-4">Unauthorized Access</H1>
      <p className="text-xl mb-8">
        You don&apos;t have permission to view this page.
      </p>
      <Button asChild>
        <Link href="/login">Go to Login</Link>
      </Button>
    </div>
  );
}
