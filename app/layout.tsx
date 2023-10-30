import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Dashboard admin panel1",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="system"
//         enableSystem
//         disableTransitionOnChange
//       >
//         <body className={inter.className}>{children}</body>
//       </ThemeProvider>
//     </html>
//   );
// }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ClerkProvider>
        </body>
      </html>
    </>
  );
}
