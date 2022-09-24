import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [showAmountSelector, setShowAmountSelector] = useState(true);
  const [showConfirmOnWallet, setShowConfirmOnWallet] = useState(true);
  const [checkBoxState, setCheckBoxState] = useState(false);
  if (window.ethereum) {
    // Do something
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: ['0xc1c7f785de74d64225ef22475f1169056cf64630', 'latest']
      })
      .then(balance => {
        // Return string value to convert it into int balance
        console.log(balance);

        // Yarn add ethers for using ethers utils or
        // npm install ethers
        console.log(ethers.utils.formatEther(balance));
        // Format the string into main latest balance
      });
  } else {
    alert('install metamask extension!!');
  }
  return (
    <div className="App bg-slate-50">
      <div className="p-40">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="mx-4 my-10 grid grid-cols-2">
            <info className="w-full">
              <h1>Current Lending Balance</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">0</span> USDC
              </h1>
            </info>
            <info className="w-full">
              <h1>Lending APY</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">51</span> %
              </h1>
            </info>
          </div>
          <div className="cursor-pointer mx-20 mb-2 px-4 py-4 rounded-full bg-orange-500">
            <div
              className=" text-xl text-white"
              onClick={() => setShowAmountSelector(false)}
            >
              Deposit USDC
            </div>
          </div>
          <p>
            Need help? <span className="text-orange-500">Watch tutorial</span>
          </p>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <div className="my-10 grid grid-cols-2">
            <info className="w-full">
              <h1>Claimable Interest</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">0</span> USDC
              </h1>
            </info>
            <info className="w-full">
              <h1>Lockup Timer</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">542</span> Days{' '}
                <span className="font-bold text-lg">7</span> Hours
              </h1>
            </info>
          </div>

          <section>
            <div className="px-6 py-4 m-8 bg-teal-200 rounded text-gray-700 text-sm">
              <div>
                <p>
                  Currently, there is not enough Total Cash in the pool to
                  process withdrawals or claim interest. Cash available to
                  withdraw increases as new deposits and loan repayments are
                  made. Please check the pool's loan details for loan maturity
                  dates.
                </p>
                <p>
                  You can request the withdrawal process as before and return in
                  10 days time.
                </p>
                <p>
                  Click <span className="text-orange-500">here</span> for more
                  information.
                </p>
              </div>
            </div>
            <div className="text-gray-400 text-l mt-2">Request Withdrawal</div>
          </section>

          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div>
      {/* AMOUNT SELECTOR */}
      <div
        className={`w-screen h-screen bg-amber-500 absolute top-0 left-0 ${
          showAmountSelector && 'hidden'
        }`}
      >
        <div className="rounded bg-white m-40">
          <h1>Current Lending Balance</h1>
          <div className="my-10 grid grid-cols-2">
            <info className="w-full">
              <h1>Wallet Balance</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">0</span> USDC
              </h1>
            </info>
            <info className="w-full">
              <h1>Available Capacity of Pool</h1>
              <h1 className="text-sm">
                <span className="font-bold text-lg">51</span> %
              </h1>
            </info>
          </div>
          <div className="bg-teal-200 py-3 px-8">
            <h1 className="text-sm">How much would you like to deposit?</h1>
            <div className="flex flex-row">
              <input
                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm "
                placeholder="Deposit Amount"
                type="number"
              />
              <img
                src="/img/usdc.png"
                alt="usdc"
                width="40px"
                className="p-1"
              />
              <div>
                <button class="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">
                  Max
                </button>
              </div>
            </div>
          </div>
          <div className="rounded bg-orange-100 mx-5 p-5 mt-8">
            <input
              type="checkbox"
              checked={checkBoxState}
              onClick={() => setCheckBoxState(!checkBoxState)}
            />{' '}
            I have read and agree to America Foundation;s Terms and Conditions.
          </div>
          <div className="flex flex-row my-5 mx-20 gap-20">
            <div className="cursor-pointer mb-2 px-10 py-4 rounded-full bg-white border-solid border-2 border-orange-500">
              <div
                className="text-xl text-orange-500"
                onClick={() => setShowAmountSelector(true)}
              >
                Cancel
              </div>
            </div>
            <div className="cursor-pointer mb-2 px-20 py-4 rounded-full bg-orange-500">
              <div
                className="text-xl text-white"
                onClick={() => {
                  if (checkBoxState) setShowConfirmOnWallet(false);
                }}
              >
                Deposit
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AMOUNT SELECTOR */}
      <div
        className={`w-screen h-screen bg-amber-500 absolute top-0 left-0 ${
          showConfirmOnWallet && 'hidden'
        }`}
      >
        Please confirm the transaction in your wallet.
      </div>
    </div>
  );
}

export default App;
