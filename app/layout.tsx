import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Fashion - Admin Auth",
  description: "Admin dashboard to manage My Fashion's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Main Content */}
      {children}
    </div>
  );
}
