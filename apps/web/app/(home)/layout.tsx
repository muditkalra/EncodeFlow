import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("Inside home layout");

    const { userId } = await auth();
    if (userId) redirect('/dashboard');

    return (
        <div className="min-h-screen px-4 md:px-6 flex flex-col mx-auto">
            <Navbar />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}
