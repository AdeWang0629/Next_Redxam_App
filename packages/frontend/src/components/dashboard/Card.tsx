import { ReactNode } from "react";
import type { NextPage } from "next";

interface CardProps {
  width?: string;
  height?: string;
  py?: string;
  px?: string;
  m?: string;
  my?: string;
  mx?: string;
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
  my = "",
  mx = "",
  m = "",
  children,
  otherClasses = "",
}) => {
  return (
    <div
      className={`shadow-card rounded-[25px] relative overflow-hidden ${width} ${height} ${p} ${py} ${px} ${my} ${mx} ${m} ${otherClasses}`}
    >
      {children}
    </div>
  );
};

export default Card;
