import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Atkinson_Hyperlegible } from "next/font/google";

const DosisF = Atkinson_Hyperlegible({ weight: "400", subsets: ["latin"] });
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen  bg-slate-50 antialiased",DosisF.className)}>
        <Providers >
        {" "}      <Navbar />

       {authModal}{children}
        </Providers >
      </body>
    </html>
  );
}
