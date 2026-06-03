"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/dist/client/components/navigation";
import { useTransition } from "react";

interface RefreshButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "outline" | "default" | "ghost";
  showLabel?: boolean;
}

const RefreshButton = ({
  size = "default",
  variant = "default",
  showLabel = true,
}: RefreshButtonProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`w-4 h-4 ${isPending ? "animate-spin" : ""} ${showLabel ? "mr-2" : ""}}`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
};

export default RefreshButton;
