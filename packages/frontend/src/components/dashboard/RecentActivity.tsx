import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@utils/api";
import Image from "next/image";
import Card from "./Card";
import { getMonthName } from "@utils/helpers";
import filterIcon from "@public/icons/filter.svg";
import BankIcon from "@public/icons/bank.svg";
import EmptyImage from "@public/images/dashboard/deposits/empty.svg";

const RecentActivity = () => {
  const router = useRouter();
  const [deposits, setDeposits] = useState<
    | []
    | [
        {
          type: string;
          amount: number;
          index: null;
          currency: string;
          timestamp: number;
          processedByRedxam: true | false;
          status: string;
          hash: null;
          address: null;
          bankIcon: string | null;
          bankName: string | null;
          bankType: string | null;
        }
      ]
  >([]);

  const [filteredDeposits, setFilteredDeposits] = useState<
    | []
    | [
        {
          month: number;
          deposits: [
            {
              type: string;
              amount: number;
              index: null;
              currency: string;
              timestamp: number;
              processedByRedxam: true | false;
              status: string;
              hash: null;
              address: null;
              bankIcon: string | null;
              bankName: string | null;
              bankType: string | null;
            }
          ];
        }
      ]
  >([]);

  useEffect(() => {
    (async () => {
      let { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
    })();
  }, []);

  useEffect(() => {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    setFilteredDeposits(
      // @ts-ignore
      months.map((month) => {
        let filtered = deposits
          .filter((deposit) => deposit.status !== "pending")
          .filter((deposit) => {
            return (
              new Date(deposit.timestamp).getMonth() + 1 === month &&
              new Date(deposit.timestamp).getFullYear() ===
                new Date().getFullYear()
            );
          });

        return { month, deposits: filtered };
      })
    );
  }, [deposits]);

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

      {deposits.filter((deposit) => deposit.status === "pending").length ? (
        <>
          <div className="bg-yellow-100 py-1.5">
            <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
              Pending
            </p>
          </div>
          <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
            {deposits
              .filter((deposit) => deposit.status === "pending")
              .map((deposit, index) => (
                <div
                  className={`flex items-center ${
                    deposits.filter((deposit) => deposit.status === "pending")
                      .length !== 1 && index === 0
                      ? "pb-5"
                      : deposits.filter(
                          (deposit) => deposit.status === "pending"
                        ).length !== 1
                      ? "py-5"
                      : ""
                  } ${
                    deposits.filter((deposit) => deposit.status === "pending")
                      .length !== 1 &&
                    index ===
                      deposits.filter((deposit) => deposit.status === "pending")
                        .length -
                        1
                      ? "pt-5 pb-0"
                      : deposits.filter(
                          (deposit) => deposit.status === "pending"
                        ).length !== 1
                      ? "border-b"
                      : ""
                  }`}
                  key={"deposit" + deposit.timestamp}
                >
                  <Image
                    src={
                      deposit.bankIcon
                        ? `data:image/png;base64,${deposit.bankIcon}`
                        : BankIcon
                    }
                    width={"40px"}
                    height={"40px"}
                    className={deposit.bankIcon ? "rounded-full" : ""}
                    alt="Bank Image"
                  />
                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-secondary text-sm text-lighter-black mb-1.5">
                      {deposit.bankName || "Unknown bank"}
                    </p>
                    <p className="font-secondary text-xs text-[#95989B]">
                      PLACEHOLDER: ACC TYPE
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end ml-auto">
                    <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                      {deposit.currency === "USD" ? "$" : deposit.currency}
                      {deposit.amount}
                    </p>
                    <div className="flex justify-center items-center">
                      <p className="font-secondary text-xs text-[#95989B] mr-1">
                        Pending •{" "}
                        {new Date(deposit.timestamp).toLocaleDateString(
                          undefined,
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
                        {", "}
                        {new Date(deposit.timestamp).toLocaleTimeString(
                          undefined,
                          {
                            minute: "2-digit",
                            hour: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : null}

      {filteredDeposits.length ? (
        filteredDeposits
          .filter((filteredDeposits) => filteredDeposits.deposits.length)
          .map((filteredDeposit) => (
            <div key={"deposits" + filteredDeposit.month}>
              <div className="bg-[#FAFAFA] py-1.5">
                <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                  {getMonthName(filteredDeposit.month)}{" "}
                  {new Date().getFullYear()}
                </p>
              </div>

              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                {filteredDeposit.deposits.map((deposit, index) => (
                  <div
                    className={`flex items-center ${
                      index === 0 ? "pb-5" : "py-5"
                    } ${
                      index === filteredDeposit.deposits.length - 1
                        ? "pt-5 pb-0"
                        : "border-b"
                    }`}
                    key={"deposit" + filteredDeposit.month + deposit.timestamp}
                  >
                    <Image
                      src={
                        deposit.bankIcon
                          ? `data:image/png;base64,${deposit.bankIcon}`
                          : BankIcon
                      }
                      width={"40px"}
                      height={"40px"}
                      className={deposit.bankIcon ? "rounded-full" : ""}
                      alt="Bank Image"
                    />
                    <div className="flex flex-col justify-center ml-4">
                      <p className="font-secondary text-sm text-lighter-black mb-1.5">
                        {deposit.bankName || "Unknown bank"}
                      </p>
                      <p className="font-secondary text-xs text-[#95989B]">
                        {deposit.bankType || "Unknown account type"}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-end ml-auto">
                      <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                        {deposit.currency === "USD" ? "$" : deposit.currency}
                        {deposit.amount}
                      </p>
                      <div className="flex justify-center items-center">
                        <p className="font-secondary text-xs text-[#95989B] mr-1">
                          {new Date(deposit.timestamp).toLocaleDateString(
                            undefined,
                            {
                              day: "2-digit",
                              month: "short",
                            }
                          )}
                          {", "}
                          {new Date(deposit.timestamp).toLocaleTimeString(
                            undefined,
                            {
                              minute: "2-digit",
                              hour: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <div className="mt-16 flex flex-col items-center px-8 pb-10">
          <Image src={EmptyImage} />
          <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
            No transactions has been made from any of the added bank accounts.
          </p>
        </div>
      )}

      <button
        className="w-full text-center font-medium font-secondary text-base underline py-4"
        onClick={() => router.push("/deposit")}
      >
        View all
      </button>
    </Card>
  );
};

export default RecentActivity;
