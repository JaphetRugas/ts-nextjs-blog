"use client" 
import React from "react";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  const handleSignout = async () => {
    await signOut();
  };

  return (
    <button onClick={handleSignout} className="text-white">
      <IoLogOutOutline />
    </button>
  );
};

export default LogoutButton;

