import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import api from "src/utils/api";
import { validateEmail } from "src/utils/helpers";

interface WaitlistModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}

const WaitlistModel: NextPage<WaitlistModelProps> = ({
  isOpened,
  setOpened,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralCodeInvalid, setReferralCodeInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const outsideContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpened) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [isOpened]);

  function handleOutsideClick(event: any) {
    if (outsideContainerRef.current == event.target) {
      setOpened(false);
      document.body.style.overflow = "auto";
    }
  }

  const checkEmail = () => {
    if (!validateEmail(email)) setEmailInvalid(true);
    else setEmailInvalid(false);
  };

  const handleReferralCode = (e: React.ChangeEvent<any>) => {
    const re = /^[a-z0-9]+$/i;
    if (re.test(e.target.value) || e.target.value === "") {
      setReferralCode(e.target.value);
      setReferralCodeInvalid(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (referralCode.length < 8 && referralCode.length > 0)
      return setReferralCodeInvalid(true);

    setLoading(true);

    const res = await api
      .createWaitlist(email, firstName, lastName, referralCode)
      .catch(() => {
        alert("An error occurred!");
      })
      .finally(() => {
        setLoading(false);
      });

    if (res?.data.data.createWaitlist.success) {
      setWaitlistSuccess(true);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
      ref={outsideContainerRef}
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col items-center bg-white rounded-[30px] w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/3  px-6 py-16 relative overflow-hidden">
        <div
          className={`bg-buttons-green w-full py-3 absolute top-0 rounded-t-[30px] transition-transform duration-500 ${
            !waitlistSuccess && "translate-x-[-1000px]"
          }`}
        >
          <p className="text-black text-center font-medium font-secondary">
            You’ve been added to the waitlist!
          </p>
        </div>
        <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
          Join the Waitlist
        </h3>
        <p className="w-full mb-5 text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
          Sign up for the beta and be the first to be notified when we launch
        </p>

        {emailInvalid && (
          <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.8] text-md font-primary text-center">
            Enter a valid email address
          </p>
        )}

        {referralCodeInvalid && (
          <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.8] text-md font-primary text-center">
            Referrall is a 8 digits code
          </p>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row mt-5">
            <div className="md:mr-2 input-wrapper">
              <input
                type="text"
                className="font-secondary"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstName"
              />
              <label className="font-primary" htmlFor="firstName">
                First name
              </label>
            </div>
            <div className="md:ml-2 mt-5 md:mt-0 input-wrapper">
              <input
                type="text"
                className="font-secondary"
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                value={lastName}
              />
              <label className="font-primary" htmlFor="lastName">
                Last name
              </label>
            </div>
          </div>
          <div
            className={`mt-5 input-wrapper w-full ${emailInvalid && "invalid"}`}
          >
            <input
              type="text"
              className="font-secondary w-full"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => checkEmail()}
              value={email}
              id="email"
            />
            <label className="font-primary" htmlFor="email">
              Email address
            </label>
          </div>
          <div
            className={`mt-5 input-wrapper w-full ${
              referralCodeInvalid && "invalid"
            }`}
          >
            <input
              type="text"
              className="font-secondary w-full"
              onChange={(e) => handleReferralCode(e)}
              value={referralCode}
              id="referralCode"
              maxLength={8}
              autoComplete="off"
            />
            <label className="font-primary" htmlFor="referralCode">
              Referral Code (Optional)
            </label>
          </div>
          <button
            className="text-lighter-black font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-buttons-green rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={
              loading || referralCodeInvalid || emailInvalid || email === ""
            }
            id="join-waiting-button"
          >
            Join the Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModel;
