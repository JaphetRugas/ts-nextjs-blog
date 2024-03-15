import React from "react";
import Link from "next/link";
import { SparklesCore } from "./components/ui/sparkles";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();  
  if (session) {
    redirect("/dashboard");
  }   
  
  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-900 min-h-screen overflow-hidden">
      <SparklesCore
        id="sparklesBackground"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0 z-0"
        particleColor="#FFFFFF"
      />
      <div className="flex flex-col justify-center items-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Welcome to Simple Blog
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Discover amazing blog posts and share your thoughts.
        </p>
        <div className="mb-8 space-x-4">
          <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"> 
              Login 
          </Link>
          <Link href="/register" className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"> 
              Register 
          </Link>
        </div> 
      </div> 
    </div>
  );
}
