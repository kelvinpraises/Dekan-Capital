"use client";
import { Inter, Lexend } from "next/font/google";

import RootProvider from "@/library/providers/provider";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import { cn } from "@/library/utils";

const inter = Inter({ subsets: ["latin"], preload: true });
const lexend = Lexend({
  subsets: ["latin"],
  preload: true,
  variable: "--font-lexend",
});


const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, lexend.variable)}
      >
        <RootProvider>
          <main className="flex flex-col gap-2 w-screen relative h-screen">
            <Header />
            {children}
            <Footer className="pt-8" />
          </main>
        </RootProvider>
      </body>
    </html>
  );
};

export default LayoutWrapper;
