"use client";
import { Inter } from "next/font/google";

import RootProvider from "@/library/providers/provider";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const inter = Inter({ subsets: ["latin"], preload: true });

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>
          <main className="flex flex-col gap-2 w-screen relative h-screen">
            <Header />
            <div className="flex flex-col gap-2 w-screen flex-1 overflow-y-scroll">
              <div className="flex-1 px-16">{children}</div>
              <Footer className="pt-8" />
            </div>
          </main>
        </RootProvider>
      </body>
    </html>
  );
};

export default LayoutWrapper;
