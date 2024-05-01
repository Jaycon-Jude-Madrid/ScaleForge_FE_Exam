import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextThemesProvider } from "@/providers/NextThemeProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import { EventsContextProvider } from "@/providers/EventsContextProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ScaleForge Exam",
	description: "Exam",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<TanstackProvider>
					<NextThemesProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<EventsContextProvider>{children}</EventsContextProvider>
					</NextThemesProvider>
				</TanstackProvider>
			</body>
		</html>
	);
}
