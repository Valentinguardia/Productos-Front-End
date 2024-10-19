"use client";
import localFont from "next/font/local";
import "./globals.css";
import { StoreProvider } from "../state/StoreProvider";
import Footer from "@/commons/Footer";
import Navbar from "@/commons/Navbar";
import { getAllBrands } from "@/services/brandsData";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  //
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands();
      if (data) {
        setBrands(data);
      }
    };

    fetchBrands();
  }, []);
  //

  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar brands={brands} />
          <div className="flex-grow flex items-center justify-center">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
