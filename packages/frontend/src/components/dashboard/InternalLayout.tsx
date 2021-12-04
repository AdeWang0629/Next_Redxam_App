import { ReactNode } from "react";
import type { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";

interface InternalLayoutProps {
  children?: ReactNode;
}

const InternalLayout: NextPage<InternalLayoutProps> = ({ children }) => {
  return (
    <div className="container my-0 mx-auto">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default InternalLayout;