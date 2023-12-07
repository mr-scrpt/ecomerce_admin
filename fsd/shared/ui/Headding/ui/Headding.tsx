import { FC, HTMLAttributes } from "react";
import { Title } from "@/fsd/shared/ui/Title/ui/Title";
import { Paragraph } from "@/fsd/shared/ui/Paragraph/ui/Paragraph";

interface HeaddingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export const Headding: FC<HeaddingProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="flex flex-col">
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};
