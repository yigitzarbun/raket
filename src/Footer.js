import React from "react";
import { useLocation } from "react-router-dom";
function Footer() {
  const { pathname } = useLocation();
  let resultJsx = "";
  if (pathname == "/intro") {
    resultJsx = "";
  } else {
    resultJsx = (
      <div className=" flex justify-between bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <p className="text-white font-bold text-2xl cursor-pointer">Raket</p>
        <nav className="w-2/3 flex flex-wrap">
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Train
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Match
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Account
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Equipment
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Collaboration
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Contact
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            Privacy Policy
          </a>
          <a className="text-md text-blue-500 hover:text-blue-400 cursor-pointer w-1/4">
            User Agreement
          </a>
        </nav>
      </div>
    );
  }
  return <div>{resultJsx}</div>;
}

export default Footer;
