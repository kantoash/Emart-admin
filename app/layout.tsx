import { AuthContext } from "@/components/auth-context";
import "./globals.css";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ModalProvider />
            <Toaster />
            {children}
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
