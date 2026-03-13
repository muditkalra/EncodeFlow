import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

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
