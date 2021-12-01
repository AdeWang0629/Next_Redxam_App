import { ReactNode } from "react";
import type { NextPage } from "next";

export default function CardContainer({ children }: { children: ReactNode }) {
  return <div className="shadow-card rounded-[25px] py-4 px-8">{children}</div>;
};