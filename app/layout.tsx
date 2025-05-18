import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnifyIQ",
  description:
    "UnifyIQ is a platform that helps you build AI applications with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
