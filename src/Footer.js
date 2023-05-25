import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Footer() {
  const [subscribe, setSubscribe] = useState("");
  const handleSubscribe = (e) => {
    setSubscribe("");
  };

  const { pathname } = useLocation();
  let resultJsx = "";
  if (pathname == "/intro" || pathname == "/login" || pathname == "/register") {
    resultJsx = "";
  } else {
    resultJsx = (
      <div className=" flex flex-col justify-between bg-black p-8 w-full mt-8 rounded-md shadow-md">
        <div className=" flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-white font-bold text-2xl cursor-pointer">
              Raket
            </p>
            <address className="text-slate-200 text-sm mt-4">
              Caddebostan Mah. Mine Sok. <br /> No: 8 D: 1, Kadıköy / İstanbul
            </address>
            <p className="text-slate-200 text-sm mt-4">
              <span className="font-bold text-white">E:</span> hello@raket.com
            </p>
            <p className="text-slate-200 text-sm mt-4">
              <span className="font-bold text-white">T:</span> (0216) 411 41 41
            </p>
          </div>
          <nav className="w-2/3 flex flex-wrap">
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Train
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Match
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Account
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Equipment
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Collaboration
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Contact
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              Privacy Policy
            </a>
            <a className="text-md mt-4 text-slate-200 hover:text-blue-400 cursor-pointer w-1/4">
              User Agreement
            </a>
            <div className="w-2/3 mt-8">
              <h3 className="font-bold text-white italic text-xl">
                Subscribe to newsletter
              </h3>
              <div className="flex mt-2">
                <input
                  type="email"
                  className="p-2 rounded-md w-full "
                  placeholder="e.g. john@email.com"
                  onChange={(e) => setSubscribe(e.target.value)}
                  value={subscribe}
                />
                <button
                  onClick={handleSubscribe}
                  className="border-2 border-blue-500 rounded-md hover:bg-blue-500 font-bold ml-2 text-white p-2"
                >
                  Send
                </button>
              </div>
            </div>
          </nav>
        </div>

        <div className="flex justify-between w-2/3 ml-auto mt-8">
          <img
            src="/images/bakanlik.png"
            alt="bakanlik-logo"
            className="w-12 h-12 rounded-sm"
          />
          <img
            src="/images/ibb.png"
            alt="ibb-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
          <img
            src="/images/ttf.png"
            alt="ttf-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
          <img
            src="/images/mastercard.png"
            alt="mastercard-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
          <img
            src="/images/visa.png"
            alt="visa-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
          <img
            src="/images/paypal.png"
            alt="paypal-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
          <img
            src="/images/amex.png"
            alt="amex-logo"
            className="object-contain w-12 h-12 rounded-sm"
          />
        </div>
      </div>
    );
  }
  return <div>{resultJsx}</div>;
}

export default Footer;
