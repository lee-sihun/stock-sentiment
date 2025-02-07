import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-10 min-h-[60px] flex justify-center text-sm text-[#262626] dark:text-[#A3A3A3] border-t border-[rgba(255,255,255,0.2)] z-[2]">
      <div className="text-center flex flex-col justify-center">
        <span className="block">
          Copyright © 2025{" "}
          <Link className="underline" href="https://github.com/lee-sihun">
            lee-sihun
          </Link>
          {" · "}
          <Link className="underline" href="https://github.com/yeonu-me">
            Yeonu
          </Link>{" "}
          All rights reserved.
        </span>
        <span className="block">
          Powered by{" "}
          <Link className="underline" href="https://vercel.com/">
            Vercel.
          </Link>
        </span>
      </div>
    </footer>
  );
}
