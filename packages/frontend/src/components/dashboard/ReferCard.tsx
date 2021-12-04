import Image from "next/image";
import IconButton from "./IconButton";
import Card from "./Card";

// Imgs
import referBg from "@public/images/dashboard/refer-bg.svg";
import shareIcon from "@public/icons/share.svg";

const ReferCard = () => {
  return (
    <Card width="w-[440px]" height="h-[197px]">
      <div className="flex h-full">
        <div className="flex flex-col justify-center pl-7">
          <p className="mb-10 font-secondary text-sm text-[#6A6E73]">
            Lorem ipsum asked the dog to jump over 17 foxes, but the dog barked
            and asked Lorem to not order like a dog.
          </p>
          <IconButton buttonText={"Refer a Friend"} buttonIcon={shareIcon} />
        </div>
        <div className="w-full h-full flex justify-end rounded-[25px]">
          <Image
            src={referBg}
            alt="Refer Background"
            width="107px"
            height="197px"
            className="rounded-r-[25px]"
          />
        </div>
      </div>
    </Card>
  );
};

export default ReferCard;