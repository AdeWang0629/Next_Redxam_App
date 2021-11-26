import React from "react";
import Image from "next/image";

// interface IconButtonProps {
//   buttonText?: string;
//   buttonIcon?:
// }

const IconButton = ({ buttonText, buttonIcon }) => {
  return (
    <div className="bg-white">
      <div className="flex jutify-center items-center">
        <div className="flex jutify-center items-center mr-2 rounded-full bg-lighter-black p-2.5">
          <Image
            src={buttonIcon}
            alt="Settings Icon"
            width="24px"
            height="24px"
          />
        </div>
        <div>
          <p className="text-white font-secondary text-lighter-black font-medium">
            {buttonText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IconButton;
