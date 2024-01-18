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
          <main className=" flex flex-col gap-1 w-screen relative h-screen">
            <Header />
            <div className=" flex px-1 gap-1 h-full">{children}</div>
            <Footer className=" pt-8" />
          </main>
        </RootProvider>
      </body>
    </html>
  );
};

export default LayoutWrapper;
