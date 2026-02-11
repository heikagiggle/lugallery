import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Lugallery",
  description: "The one App uniting clients and partners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body
        className="flex flex-col min-h-screen"
      >
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
