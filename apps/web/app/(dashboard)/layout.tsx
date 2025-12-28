import AppSideBar from "@/components/AppSideBar";
import DashboardNavbar from "@/components/DashboardNavbar";
// import Navbar from "@/components/Navbar";
// import QueryProvider from "@/components/providers/QueryProvider";
// import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        // <QueryProvider>
        <div className="flex">
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSideBar />
                <main className="w-full">
                    <DashboardNavbar />
                    <div className="">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
        // <Toaster position="bottom-right" />
        // </QueryProvider>
    );
}
