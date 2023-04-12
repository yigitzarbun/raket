import React from "react";
import ClubDetails from "./ClubDetails";
import ClubPayments from "./ClubPayments";
import ClubBookings from "./ClubBookings";
function ClubAccount() {
  return (
    <div>
      <div className="bg-heroClubAccount bg-center bg-auto py-28 rounded-md mt-4"></div>
      <div className="flex">
        <ClubDetails />
        <ClubBookings />
        <ClubPayments />
      </div>
    </div>
  );
}

export default ClubAccount;
