import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, HTMLAttributes } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/provider/modal-provider";
import { ClerkProvider, auth } from "@clerk/nextjs";

import { getStoreList } from "@/actions/get-store-list";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/provider/toast-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Dashboard admin panel1",
};

interface RootLayoutProps extends HTMLAttributes<HTMLElement> {
  params: { storeSlug: string };
}

const RootLayout: FC<RootLayoutProps> = async (props) => {
  const { children } = props;

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
        <body className={cn(inter.className, "flex flex-col")}>
          <ModalProvider />
          <ToastProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Header className="w-full border-t" storeList={storeList} /> */}
            <Header className="w-full border-t" />
            <div className="w-full grow">{children}</div>
            <Footer className="w-full border-t" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
