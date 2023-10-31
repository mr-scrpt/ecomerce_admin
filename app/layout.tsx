import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/provider/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { ToastProvider } from "@/provider/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Dashboard admin panel1",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
}
