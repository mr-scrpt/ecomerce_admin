"use client";
import { FC, HTMLAttributes } from "react";
import { Notice } from "../Notice/Notice";
import { useOrigin } from "../../hook/useOrigin";

interface NoticeApiProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  variant: string;
  apiPath: string;
}

export const NoticeApi: FC<NoticeApiProps> = (props) => {
  const { title, variant, apiPath } = props;
  const origin = useOrigin;
  return (
    <Notice
      title={title}
      variant={variant}
      description={`${origin}/api/${apiPath}`}
    />
  );
};
