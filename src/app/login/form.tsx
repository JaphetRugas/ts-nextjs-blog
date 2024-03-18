"use client";
import React, { FormEvent, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { SparklesCore } from "../components/ui/sparkles";
import { signIn } from "next-auth/react";

export default function Form() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (response?.error) {
      setErrorMessage(response.error);
    } else if (response?.ok) {
      router.push("/dashboard");
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 min-h-screen overflow-hidden relative">
      <SparklesCore
        id="sparklesBackground"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0 z-0"
        particleColor="#FFFFFF"
      />
      <div className="flex flex-col justify-center items-center relative z-10 w-full max-w-3xl px-4">
        <div className="bg-gray-700 bg-opacity-40 rounded-lg p-8">
          <h2 className="text-4xl font-bold mb-4 text-white">Log In</h2>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">
                Email
              </label>
              <input
                className="w-full h-10 px-3 py-2 mb-3 text-sm leading-tight bg-gray-100 text-gray-70 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">
                Password
              </label>
              <input
                className="w-full h-10 px-3 py-2 mb-3 text-sm leading-tight bg-gray-100 text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                required
              />
            </div>
            <div className="mb-4 text-center">
              <button
                className="w-full px-3 py-2 mb-5 rounded bg-blue-500 text-white hover:bg-blue-600"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="text-center mb-0 text-gray-200">
              Is this your first time here?{" "}
              <Link
                className="text-sm align-baseline text-blue-500 hover:underline"
                href="/register"
              >
                Sign Up
              </Link> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
