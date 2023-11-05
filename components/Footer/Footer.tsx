import { FC, HTMLAttributes } from "react";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <div className="m-auto max-w-7xl p-4">Footer</div>
    </div>
  );
};
