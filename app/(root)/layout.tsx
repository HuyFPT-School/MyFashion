import { type Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "My Fashion - Home",
  description: "Home page to show My Fashion's products",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
