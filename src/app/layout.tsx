import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/lib/AuthProvider";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./components/ui/logoutbutton";
import UserInfo from "./components/UserInfo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "Welcome to the simple blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  try {
    session = await getServerSession();
    console.log("Session data in RootLayout:", session);
  } catch (error) {
    console.error("Error fetching user session:", error);
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {session && (
              <nav className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
                <div>
                  <Link href="/dashboard" className="text-lg font-semibold">
                    Simple Blog
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <UserInfo />
                  <LogoutButton />
                </div>
              </nav>
            )}
            <main className="flex-grow">{children}</main>
            <footer className="text-white absolute bottom-0 right-0 p-4">
              <p>&copy; 2024 Simple Blog. Created by Jade Japhet R. Rugas</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
