import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/navigation/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infrastructure Template",
  description: "Example Infrastructure Template - Notes App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
