import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, HTMLAttributes } from "react";

import { ThemeProvider } from "@/fsd/shared/ui/theme-provider";
import { ModalProvider } from "@/provider/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";

import { ToastProvider } from "@/provider/toast-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Dashboard admin panel1",
};
interface RootLayoutProps extends HTMLAttributes<HTMLElement> {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
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
