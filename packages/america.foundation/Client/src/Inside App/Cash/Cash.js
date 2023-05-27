import { useState, useEffect } from "react";
import Cash_Body from "./Cash_Body";
import Cash_Transfer from "./Cash_Transfer";
import "./Cash.css";
import {
  Elements,
  useStripe,
  useElements,
  ElementsConsumer,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../AuthContext";
import StripeSetUp from "./StripeSetUp";
import { PlaidLink } from "react-plaid-link";

function Cash() {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const { currentUser } = useAuth();
  // const [stripePromise, setStripePromise] = useState(() =>
  //   loadStripe(
  //     "pk_test_51McehME8HTSvSYTqwAS9pk1vjdezB69nkHYqtUXT5XzxRIEvkxeBN2Urx8MpcGJehjstXW4X6siXC0LlTaHLhgnt004JEPHOCz"
  //   )
  // );

  const uid = currentUser.uid;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenSecondModal = () => {
    setShowSecondModal(true);
    setShowModal(false);
  };

  const handleCloseSecondModal = () => {
    setShowSecondModal(false);
  };

  // Fetch the client secret from the server when the component mounts
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:8000/setupIntent.stripe", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ uid: uid }),
  //     });

  //     const { client_secret: secret } = await response.json();
  //     setClientSecret(secret);
  //   })();
  // }, []);

  // if (!clientSecret) {
  //   // Render a loading indicator until the client secret is fetched
  //   return <div>Loading...</div>;
  // }

  // const options = {
  //   // Pass the client secret obtained from the server
  //   clientSecret: clientSecret,
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   },
  // };

  return (
    // <Elements key={clientSecret} stripe={stripePromise} options={options}>
    <div className="app_body" style={{ paddingTop: "65px" }}>
      <div className="app_container">
        <Cash_Body />

        <Cash_Transfer openModal={handleOpenModal} uid={uid} />
        {showModal && (
          <div className="modal-overlay">
            <div className="modal_addaccount">
              <div className="addaccount_close" onClick={handleCloseModal}>
                <div className="addaccount_close_container"> Close</div>
              </div>
              <div className="addaccount_title">Choose account type</div>
              <div className="addaccount_zelle" onClick={handleOpenSecondModal}>
                <svg
                  className="addaccount_zelle_logo_container"
                  viewBox="-70 0 400 400"
                  width="50"
                  height="50"
                >
                  <path
                    className="addaccount_logos"
                    d="m211.2,300.43c-2.7-5.26-4.74-11.57-5.51-12.08-18.05-.83-121.9-.61-121.85-1.27L229.3,99.64v-44.44h-85.51V0h-53.92v55.21l-84.39-.78v55.98h139.85L0,296.7v47.38h89.87v54.56h53.92v-54.56h91.67c.77-2.18,1.04-8.07-3.84-13.46-8.09-8.99-14.52-18.38-20.43-30.19Z"
                  />
                </svg>

                <div className="addaccount_zelle_holder">
                  <div className="addaccount_zelle_container">Zelle</div>
                  <div className="addaccount_zelle_description">
                    Instant Transfers · $1K-10K daily deposit limit (depending
                    on your bank)
                  </div>
                </div>
              </div>
              <div className="addaccount_zelle">
                <svg viewBox="-1 -5 35 35" width="50" height="50">
                  <path
                    className="addaccount_logos"
                    d="M21 10L12 2 3 10h18zm-18 12h18v-2h-2v-8h-2v8h-2v-8h-2v8h-2v-8h-2v8H9v-8H7v8H5v-8H3v2z"
                  />
                </svg>
                <div className="addaccount_zelle_holder">
                  <div className="addaccount_zelle_container">Bank Account</div>
                  <div className="addaccount_zelle_description">
                    Typically 4-5 business days
                  </div>
                </div>
              </div>

              <div className="addaccount_description">
                There’s no fee for deposits and withdrawals between your bank
                and America Foundation. Withdrawals typically take up to 30
                minutes but may take longer depending on your bank.
              </div>
            </div>
          </div>
        )}
        {showSecondModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={handleCloseSecondModal}>Close</button>
              <div className="form">
                {/* <StripeSetUp /> */}

                {/* <input type="number" placeholder="Card number" />
                  <input type="text" placeholder="Input 2" />
                  <input type="text" placeholder="Input 3" />
                  <input type="text" placeholder="Input 4" />
                  <input type="text" placeholder="Input 5" />
                  <input type="text" placeholder="Input 6" />
                  <input type="text" placeholder="Input 7" />
                  <input type="text" placeholder="Input 8" />
                  <select>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                  </select>
                  <select>
                    <option value="Option A">Option A</option>
                    <option value="Option B">Option B</option>
                    <option value="Option C">Option C</option>
                  </select> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // </Elements>
  );
}

export default Cash;
