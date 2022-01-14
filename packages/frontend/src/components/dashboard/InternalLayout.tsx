import { ReactNode } from "react";
import type { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";

interface InternalLayoutProps {
  children?: ReactNode;
}

const InternalLayout: NextPage<InternalLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#fafafa]">
      <div className="container my-0 mx-auto flex flex-col min-h-screen">
        <Header />
        <div className="pb-12 flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default InternalLayout;
