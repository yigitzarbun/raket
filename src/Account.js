import React from "react";
import AccountMyStats from "./AccountMyStats";
import PersonalDetails from "./PersonalDetails";
import PlayerCard from "./PlayerCard";
import PaymentHistory from "./PaymentHistory";
import AccountEvents from "./AccountEvents";
function Account() {
  return (
    <div>
      <div className="bg-heroAccount bg-bottom bg-cover py-28 rounded-md mt-4"></div>
      <div className="flex justify-between">
        <PersonalDetails />
        <PlayerCard />
        <PaymentHistory />
      </div>
      <div className="flex justify-between">
        <AccountMyStats />
        <AccountEvents />
      </div>
    </div>
  );
}

export default Account;
