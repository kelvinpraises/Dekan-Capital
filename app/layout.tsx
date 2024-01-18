import LayoutWrapper from "@/library/components/template/LayoutWrapper";
import "@/library/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dekan Capital",
  description:
    "Raise capital from pooled funds using GHO backed Dekan voting and allocation vault token",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
