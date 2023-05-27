import React, { useState } from "react";
import "./StripeSetUp.css";
import {
  Elements,
  useStripe,
  useElements,
  ElementsConsumer,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

function StripeSetUp() {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/Cash",
      },
      redirect: "if_required",
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.

      // Show modal overlay with success message
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = "<h1>Payment Successfully Added</h1>";

      // Append modal to the body
      document.body.appendChild(modal);

      // Set timeout to remove modal and refresh page
      setTimeout(() => {
        modal.remove();
        navigate(0);
      }, 4500);
    }
  };

  return (
    <div>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}>Submit</button>
      </form>
    </div>
  );
}

export default StripeSetUp;
