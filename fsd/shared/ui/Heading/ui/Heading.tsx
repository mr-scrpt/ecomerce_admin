import { FC, HTMLAttributes } from "react";
import { Title } from "@/fsd/shared/ui/Title/ui/Title";
import { Paragraph } from "@/fsd/shared/ui/Paragraph/ui/Paragraph";

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

export const Heading: FC<HeadingProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="flex flex-col">
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};
