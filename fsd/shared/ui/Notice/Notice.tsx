"use client";
import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/fsd/shared/ui/alert";
import { Badge, BadgeProps } from "@/fsd/shared/ui/badge";
import { Button } from "@/fsd/shared/ui/button";
import { memo, useCallback } from "react";

interface NoticeProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<NoticeProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<NoticeProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const Notice = memo((props: NoticeProps) => {
  const { title, description, variant = "public" } = props;

  const onCopy = useCallback((description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard.");
  }, []);

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy.bind(false, description)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
});
