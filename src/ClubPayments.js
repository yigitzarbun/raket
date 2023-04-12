import React from "react";
import { Link } from "react-router-dom";
function ClubPayments() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-4 my-8  ml-2 w-1/4 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Payments</h2>
      <h4 className="text-2xl mt-4">TL 115,00</h4>
      <p className="mt-2">4 payments</p>
      <Link to="/club-payments">
        <p className="text-sm mt-4 italic cursor-pointer hover:text-slate-700">
          View payment history
        </p>
      </Link>
    </div>
  );
}

export default ClubPayments;
