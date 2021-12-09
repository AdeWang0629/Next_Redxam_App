import { ReactNode } from "react";
import type { NextPage } from "next";

interface CardProps {
  width?: string;
  height?: string;
  py?: string;
  px?: string;
  p?: string;
  otherClasses?: string;
  children?: ReactNode;
}

const Card: NextPage<CardProps> = ({
  width = "",
  height = "",
  py = "",
  px = "",
  p = "",
  otherClasses = "",
  children,
}) => {
  return (
    <div
      className={`shadow-card rounded-[25px] relative overflow-hidden ${width} ${height} ${p} ${py} ${px} ${otherClasses}`}
    >
      {children}
    </div>
  );
};

export default Card;
