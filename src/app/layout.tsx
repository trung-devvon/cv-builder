import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/newsreader";
import type { Metadata } from "next";
import { AppToaster } from "@/components/providers/app-toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create polished CVs from flexible templates."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
