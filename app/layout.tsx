import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, HTMLAttributes } from "react";

import { ThemeProvider } from "@/fsd/shared/ui/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ModalProvider } from "@/fsd/app/provider/modal-provider";
import { ToastProvider } from "@/fsd/app/provider/toast-provider";
import { UserProvider } from "@/fsd/app/provider/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Dashboard admin panel1",
};
interface RootLayoutProps extends HTMLAttributes<HTMLElement> {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  console.log(" =>>> load root layout");
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          <UserProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
