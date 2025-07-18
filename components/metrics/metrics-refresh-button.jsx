"use client";

import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh(); // Triggers re-fetch of server data
    });
  };

  return (
    <Button
      onClick={handleRefresh}
      variant="outline"
      className="cursor-pointer"
      disabled={isPending}
    >
      <RefreshCw
        className={`w-4 h-4 mr-2 ${isPending ? "animate-spin" : ""}`}
      />
      Refresh Data
    </Button>
  );
}
