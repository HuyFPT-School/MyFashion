import { type Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import ToastProvider from "@/lib/toastProvider";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import connectToDB from "@/lib/mongoDB";
import User from "@/lib/models/user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Fashion - Admin Dashboard  ",
  description: "Admin dashboard to manage My Fashion's data",
};

async function checkAdmin() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return false;
    }

    await connectToDB();
    const user = await User.findOne({ clerkId: userId });

    return user?.role === "admin";
  } catch (error) {
    console.error("Check admin error:", error);
    return false;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <ToastProvider />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
