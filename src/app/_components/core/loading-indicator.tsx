import { Loader2 } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className="w-6 h-6 mr-2 animate-spin text-muted-foreground" />
    </div>
  );
}
