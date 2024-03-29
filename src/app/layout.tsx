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
  } catch (error) {
    console.error("Error fetching user session:", error);
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {session && (
              <nav className="bg-slate-950 text-white p-4 fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                  <div>
                    <Link href="/dashboard" className="text-lg font-semibold">
                      Simple Blog
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/newpost"
                      className="text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4"
                    >
                      Create New Post
                    </Link>
                    <UserInfo />
                    <LogoutButton />
                  </div>
                </div>
              </nav>
            )}
            <main className="flex-grow">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
