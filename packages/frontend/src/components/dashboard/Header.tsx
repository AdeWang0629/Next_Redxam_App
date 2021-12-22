import Image from "next/image";

import headerLogo from "@public/images/dashboard/header-logo.svg";

const Header = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center h-40 space-y-5 rounded-b-3xl mb-10"
      style={{
        background: "linear-gradient(155.44deg, #9ef01a 0%, #38b000 100%)",
      }}
    >
      <Image src={headerLogo} alt="redxam Logo" width="40px" height="35px" />
    </div>
  );
};

export default Header;