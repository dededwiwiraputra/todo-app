import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Frontend Challenge - Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefin.variable}>
      <body className="font-sans">
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
