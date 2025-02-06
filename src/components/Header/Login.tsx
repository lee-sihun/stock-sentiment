"use client";
import User from "@public/svgs/user.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (session) {
    return (
      <div className="relative h-[36px]" ref={dropdownRef}>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <Image
            src={session.user?.image ?? ""}
            alt="user"
            width={36}
            height={36}
            className="rounded-full"
          />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-[#22222A] rounded-lg shadow-lg overflow-hidden whitespace-nowrap">
            <button
              onClick={() => signOut()}
              className="px-[16px] h-[38px] text-[14px] text-[#E85451] font-medium hover:bg-[#2f2f3a] transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex justify-center items-center w-[46px] h-[36px] bg-[#22222A] rounded-lg"
    >
      <User />
    </button>
  );
}
