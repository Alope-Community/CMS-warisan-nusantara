"use client";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// export const metadata: Metadata = {
//   title: "Warisan Nusantara",
//   description: "Mari lestarikan budaya nenek moyang",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#f9fafb",
          minHeight: "100vh",
        }}
        // className={inter.className}
      >
        {children}
        <ProgressBar height="5px" color="#ef4444" shallowRouting />
      </body>
    </html>
  );
}
