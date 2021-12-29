import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import api from "src/utils/api";
import { validateEmail } from "src/utils/helpers";
import WaitlistModel from "./WaitlistModel";

interface LoginModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}

const LoginModel: NextPage<LoginModelProps> = ({ isOpened, setOpened }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [waitlistModelOpened, setWaitlistModelOpened] = useState(false);
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

  function handleSubmit(event: any) {
    event.preventDefault();

    if (!email) return alert("Please enter your email");

    if (!validateEmail(email)) return alert("Please enter a valid email");

    setLoading(true);

    api
      .login(email)
      .then((res) => {
        setResponse(res.data.data.updateToken.success);
      })
      .catch(() => {
        alert("An error occurred!");
      })
      .finally(() => {
        setSubmitted(true);
        setLoading(false);
      });
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
        ref={outsideContainerRef}
        onClick={handleOutsideClick}
      >
        <div className="flex flex-col items-center bg-white rounded-[30px] w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/4 px-6 py-12">
          {!submitted ? (
            <>
              <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                Login to Redxam
              </h3>
              <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                Login for alpha and continue enjoying the best investments plan
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="mt-5 input-wrapper w-full">
                  <input
                    type="email"
                    className="font-secondary w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    id="email"
                  />
                  <label className="font-primary" htmlFor="email">
                    Email address
                  </label>
                </div>
                <button
                  className="text-white font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-[#27AE60] rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Login
                </button>
              </form>
            </>
          ) : response ? (
            <div className="flex flex-col">
              <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                Link sent
              </h3>
              <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                Please check your email inbox and click on login to continue.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                No active account
              </h3>
              <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                Sorry your account doesn’t exist yet. Please join the waitlist
                or email us at hello@redxam.com if something is wrong.
              </p>
              <div className="flex flex-col justify-center items-center">
                <button
                  className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-[25px] md:mt-0"
                  onClick={() => setWaitlistModelOpened(true)}
                >
                  Join Waitlist!
                </button>
                <a href="mailto:hello@redxam.com">
                  <button className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-2">
                    Email Us
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {waitlistModelOpened && (
        <WaitlistModel
          isOpened={waitlistModelOpened}
          setOpened={setWaitlistModelOpened}
        />
      )}
    </>
  );
};

export default LoginModel;
