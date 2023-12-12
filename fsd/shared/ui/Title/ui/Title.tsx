import { cn } from "@/fsd/shared/lib/utils";
import { FC, HTMLAttributes, memo } from "react";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {}

export const Title: FC<TitleProps> = memo((props) => {
  const { children, className } = props;
  const titleClass = cn("text-3xl font-bold tracking-tight", className);
  return <h1 className={titleClass}>{children}</h1>;
});
