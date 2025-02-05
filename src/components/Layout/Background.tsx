"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Background() {
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathname !== "/") return null;

  return (
    <div className="fixed inset-0 z-[1]">
      <div
        style={{
          position: "absolute",
          left: `${windowWidth / 2 - windowWidth / 4}px`,
          top: "500px",
          width: "1200px",
          height: "1400px",
          transform: "translate(-50%, -50%) rotate(4deg)",
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
          left: `${windowWidth / 2 + windowWidth / 4}px`,
          top: "350px",
          width: "930px",
          height: "930px",
          transform: "translate(-50%, -50%) rotate(4deg)",
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
