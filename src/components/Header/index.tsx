import SearchBar from "./SearchBar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[rgba(0,0,1,0.35)] border-b border-[rgba(255,255,255,0.2)] min-h-[60px] flex justify-center w-full">
      <div className="flex items-center justify-between h-full w-[1248px] px-[24px]">
        <Logo />
        <SearchBar />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <h1 className="text-[#fff] text-[32px] font-medium">LOGO</h1>
      </div>
    </Link>
  );
}
