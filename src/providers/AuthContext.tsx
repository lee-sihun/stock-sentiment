"use client";
import { SessionProvider } from "next-auth/react";

interface AuthProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
