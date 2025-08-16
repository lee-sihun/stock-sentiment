"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-sm text-[#AAAFBE]">
      서버 시간: {now.toLocaleString("ko-KR")}
    </div>
  );
}
