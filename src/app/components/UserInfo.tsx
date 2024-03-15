"use client"; 
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { email } = session.user;

  return (
    <div className="flex items-center space-x-2">
      <Link href="/profile" className="text-white flex items-center space-x-1">
          <span>{email}</span>
          <IoPersonOutline className="text-white" />
      </Link>
    </div>
  );
}; 

export default UserInfo;
