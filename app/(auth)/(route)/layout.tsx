import { FC, HTMLAttributes } from "react";

interface AuthLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
