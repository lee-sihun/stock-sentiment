"use client";
import { useEffect, useState } from "react";

function formatElapsed(ms: number) {
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}초 전`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  return `${day}일 전`;
}

export default function ElapsedBadge({ iso }: { iso: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ts = new Date(iso).getTime();
  const elapsed = Math.max(0, now - ts);
  return (
    <span className="px-2 py-[2px] rounded bg-[#33333B] text-xs text-[#C9CDD8]">
      {formatElapsed(elapsed)}
    </span>
  );
}
