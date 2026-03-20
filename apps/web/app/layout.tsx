import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "@/utils/metadata";

const fontSans = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontSans.variable} ${fontMono.variable}`}>
				<ClerkProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
