import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col w-[1248px] px-[24px]">{children}</div>
    </section>
  );
}
