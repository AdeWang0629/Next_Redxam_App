import { ReactNode } from "react";
import type { NextPage } from "next";

interface CardProps {
  width?: string;
  height?: string;
  py?: string;
  px?: string;
  p?: string;
  children?: ReactNode;
}

const Card: NextPage<CardProps> = ({ width, height, py, px, p, children }) => {
  return (
    <div
      className={`shadow-card rounded-[25px] relative overflow-hidden ${width} ${height} ${p} ${py} ${px}`}
    >
      {children}
    </div>
  );
};

export default Card;