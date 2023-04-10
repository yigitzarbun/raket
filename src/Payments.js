import React from "react";

function Payments() {
  return (
    <div>
      <div className="bg-heroPayments bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md w-2/3 mx-auto ">
        <h2 className="font-bold text-4xl text-white">Payment History</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          <table className="text-left w-full">
            <thead>
              <tr className="h-12 text-blue-400">
                <th>Id</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12 text-red-400">
                <td>001</td>
                <td>Match Payment</td>
                <td>10.04.2023</td>
                <td>(TL 75,00)</td>
              </tr>
              <tr className="h-12 text-red-400">
                <td>002</td>
                <td>Match Payment</td>
                <td>15.04.2023</td>
                <td>(TL 75,00)</td>
              </tr>
              <tr className="h-12 text-green-400">
                <td>003</td>
                <td>Add Balance</td>
                <td>15.04.2023</td>
                <td>TL 175,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Payments;
