import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";



export const metadata: Metadata = {
  title: "Borcelle - Store Auth",
  description: "Next.js 14 Borcelle Ecommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}
