"use client";
import { usePathname } from "next/navigation";

export default function Background() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div className="fixed inset-0 z-[1]">
      <div
        style={{
          position: "absolute",
          left: "25%",
          top: "500px",
          width: "1200px",
          height: "1400px",
          transform: "translate(-50%, -50%) rotate(4deg)",
          WebkitTransform: "translate(-50%, -50%) rotate(4deg) translate3d(0, 0, 0)",
          background:
            "linear-gradient(180deg, rgba(27,48,153,0.75) 0%, rgba(27,61,153,0) 100%)",
          opacity: 0.1,
          borderRadius: "50%",
          filter: "blur(200px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "75%",
          top: "350px",
          width: "930px",
          height: "930px",
          transform: "translate(-50%, -50%) rotate(4deg)",
          WebkitTransform: "translate(-50%, -50%) rotate(4deg) translate3d(0, 0, 0)",
          background:
            "linear-gradient(180deg, rgba(27,48,153,0.75) 0%, rgba(27,61,153,0) 100%)",
          opacity: 0.2,
          borderRadius: "50%",
          filter: "blur(200px)",
        }}
      />
    </div>
  );
}
