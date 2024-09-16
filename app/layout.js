import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GroupGPT",
  description: "Collaborative chat application using Gemini API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> {/* Add 'dark' class here */}
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  );
}
