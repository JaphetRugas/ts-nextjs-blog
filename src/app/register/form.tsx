"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { SparklesCore } from "../components/ui/sparkles";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        birthday: formData.get("birthday"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        redirect: false,
      }),
    });
    if (response.ok) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      const data = await response.json();
      setErrorMessage(data.message || "Registration failed");
      setIsSubmitting(false);
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
          <h2 className="text-4xl font-bold mb-5 text-white">
            Create an account
          </h2>
          {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                First Name
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                Last Name
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                Birthday
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="date"
                name="birthday"
                placeholder="Select your birthday"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                Email
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                Password
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-200">
                Confirm Password
              </label>
              <input
                className="mt-1 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                className={`px-4 py-2 rounded-md bg-blue-500 text-white font-semibold ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4 text-gray-200">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
