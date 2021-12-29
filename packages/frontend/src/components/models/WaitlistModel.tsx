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
  const [loading, setLoading] = useState(false);
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

    if (!firstName) return alert("Please enter your first name");
    if (!lastName) return alert("Please enter your last name");
    if (!email) return alert("Please enter your email");

    if (!validateEmail(email)) return alert("Please enter a valid email");

    setLoading(true);

    api
      .createWaitlist(email, firstName, lastName)
      .then((res) => {
        if (res.data.data.createWaitlist.success) {
          alert("Joined the waitlist successfully!");
          setOpened(false);
        } else {
          alert("An error occurred!");
        }
      })
      .catch(() => {
        alert("An error occurred!");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div
      className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
      ref={outsideContainerRef}
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col items-center bg-white rounded-[30px] w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/4 px-6 py-12">
        <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
          Join the Waitlist
        </h3>
        <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
          Sign up for the beta and be the first to be notified when we launch
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row mt-5">
            <div className="md:mr-2 input-wrapper">
              <input
                type="text"
                className="font-secondary"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstName"
                required
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
                required
              />
              <label className="font-primary" htmlFor="lastName">
                Last name
              </label>
            </div>
          </div>
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
            className="text-lighter-black font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-buttons-green rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={loading}
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
