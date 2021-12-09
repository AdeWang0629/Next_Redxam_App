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
      <div className="flex flex-col items-center bg-white rounded-[30px] w-3/4 md:w-1/4 px-6 py-12">
        <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
          Join the Waitlist
        </h3>
        <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
          Sign up for the beta and be the first to be notified when we launch
        </p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row mt-5 md:mt-2">
            <div className="flex flex-col items-center md:mr-2">
              <label className="font-primary text-xs leading-4 tracking-[-0.02em] text-darker-primary mb-1">
                First name
              </label>
              <input
                type="text"
                className="w-full font-secondary font-medium rounded-[30px] text-left pl-7 py-1 pr-2 border border-[#222426] border-opacity-20 focus:border-darker-primary focus:border-opacity-100 focus:shadow-md outline-none"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col items-center md:ml-2 mt-5 md:mt-0">
              <label className="font-primary text-xs leading-4 tracking-[-0.02em] text-darker-primary mb-1">
                Last name
              </label>
              <input
                type="text"
                className="w-full font-secondary font-medium rounded-[30px] text-left pl-7 py-1 pr-2 border border-[#222426] border-opacity-20 focus:border-darker-primary focus:border-opacity-100 focus:shadow-md outline-none"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex flex-col items-center mt-5">
            <label className="font-primary text-xs leading-4 tracking-[-0.02em] text-darker-primary mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full font-secondary font-medium rounded-[30px] text-left pl-7 py-1 pr-2 border border-[#222426] border-opacity-20 focus:border-darker-primary focus:border-opacity-100 focus:shadow-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <button
            className="text-white font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-[#27AE60] rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Join the Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModel;
