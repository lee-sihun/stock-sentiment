"use client";
import Login from "./Login";
import SearchBar from "./SearchBar";
import Link from "next/link";
import LogoIcon from "@public/svgs/logo.svg";

export default function Header() {
  return (
    <header className="bg-[rgba(0,0,1,0.35)] border-b border-[rgba(255,255,255,0.2)] min-h-[60px] flex justify-center w-full z-[10]">
      <div className="flex items-center justify-between h-full w-[1248px] px-[20px]">
        <Logo />
        <div className="flex items-center gap-[10px]">
          <SearchBar />
          <Login />
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <LogoIcon />
        <h1 className="pl-[8px] text-[#fff] text-[24px] font-semibold max-[424px]:hidden">
          DeepEye
        </h1>
      </div>
    </Link>
  );
}
