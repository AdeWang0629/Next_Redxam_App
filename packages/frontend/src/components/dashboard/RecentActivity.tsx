import Image from "next/image";
import Card from "./Card";
import filterIcon from "@public/icons/filter.svg";
import bankImg from "@public/images/dashboard/bank.svg";

const RecentActivity = () => {
  return (
    <Card width="lg:w-[440px]">
      <div className="flex justify-between items-center py-4 px-7">
        <p className="font-secondary text-lg font-medium text-lighter-black">
          Recent Activity
        </p>
        <button className="flex justify-center items-center border border-[#EAEAEB] rounded-[81px] p-3">
          <Image
            src={filterIcon}
            width={"20px"}
            height={"16px"}
            alt="Filter Button"
          />
        </button>
      </div>

      <div>
        <div className="bg-[#FAFAFA] py-1.5">
          <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
            November 2021
          </p>
        </div>

        <div className="flex justify-between items-center py-5 px-7 border-b border-[#EAEAEB]">
          <div className="w-[40px] h-[40px] bg-[#f7f7f7] rounded-[500px] mr-4"></div>
          <div className="flex flex-col justify-center">
            <p className="font-secondary  font-medium text-sm text-lighter-black mb-1.5">
              Deposited to redxam wallet
            </p>
            <p className="font-secondary  font-medium text-xs text-[#95989B]">
              Today, 05:06 PM
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
              $2200.00
            </p>
            <div className="flex justify-center items-center">
              <p className="font-secondary  font-medium text-xs text-[#95989B] mr-1">
                Sent from bank
              </p>
              <Image
                src={bankImg}
                width={"14px"}
                height={"14px"}
                alt="Bank Image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-5 px-7 border-b border-[#EAEAEB]">
          <div className="w-[40px] h-[40px] bg-[#f7f7f7] rounded-[500px] mr-4"></div>
          <div className="flex flex-col justify-center">
            <p className="font-secondary  font-medium text-sm text-lighter-black mb-1.5">
              Deposited to redxam wallet
            </p>
            <p className="font-secondary font-medium text-xs text-[#95989B]">
              Today, 05:06 PM
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
              $2200.00
            </p>
            <div className="flex justify-center items-center">
              <p className="font-secondary font-medium text-xs text-[#95989B] mr-1">
                Sent from bank
              </p>
              <Image
                src={bankImg}
                width={"14px"}
                height={"14px"}
                alt="Bank Image"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center py-5 px-7 border-b border-[#EAEAEB]">
          <div className="w-[40px] h-[40px] bg-[#f7f7f7] rounded-[500px] mr-4"></div>
          <div className="flex flex-col justify-center">
            <p className="font-secondary font-medium text-sm text-lighter-black mb-1.5">
              Deposited to redxam wallet
            </p>
            <p className="font-secondary font-medium text-xs text-[#95989B]">
              Today, 05:06 PM
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
              $2200.00
            </p>
            <div className="flex justify-center items-center">
              <p className="font-secondary font-medium text-xs text-[#95989B] mr-1">
                Sent from bank
              </p>
              <Image
                src={bankImg}
                width={"14px"}
                height={"14px"}
                alt="Bank Image"
              />
            </div>
          </div>
        </div>
      </div>
      <button className="w-full text-center font-medium font-secondary text-base underline py-4">
        View all
      </button>
    </Card>
  );
};

export default RecentActivity;
