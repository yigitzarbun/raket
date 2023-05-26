import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_USER,
  getDistricts,
  getIndoorOutdoor,
  getCourts,
  getCourtTypes,
} from "./redux stuff/actions";

function ClubDetails() {
  const dispatch = useDispatch();
  let { user, indoorOutdoor, districts, courts, courtTypes } = useSelector(
    (store) => store
  );
  if (user.club) {
    user = user.club;
  }
  let facility;
  let district;
  let numberOfCourts;
  let courtType1;
  let courtType2;
  let courtType3;
  if (
    user &&
    indoorOutdoor &&
    indoorOutdoor.filter(
      (i) => i.indoor_outdoor_id === user.indoor_outdoor_id
    )[0]
  ) {
    facility = indoorOutdoor.filter(
      (i) => i.indoor_outdoor_id === user.indoor_outdoor_id
    )[0].indoor_outdoor;
  }
  if (
    user &&
    districts &&
    districts.filter((d) => d.district_id === user.district_id)[0]
  ) {
    district = districts.filter((d) => d.district_id === user.district_id)[0][
      "district"
    ];
  }
  if (user && courts && courts.filter((c) => c.club_id === user.club_id)) {
    numberOfCourts = courts.filter((c) => c.club_id === user.club_id).length;
  }

  if (
    user &&
    courtTypes &&
    courtTypes.find((t) => t.court_type_id === user.court_type_1_id) &&
    courtTypes.find((t) => t.court_type_id === user.court_type_2_id) &&
    courtTypes.find((t) => t.court_type_id === user.court_type_3_id)
  ) {
    courtType1 = courtTypes.find(
      (t) => t.court_type_id === user.court_type_1_id
    )["court_type"];
    courtType2 = courtTypes.find(
      (t) => t.court_type_id === user.court_type_2_id
    )["court_type"];
    courtType3 = courtTypes.find(
      (t) => t.court_type_id === user.court_type_3_id
    )["court_type"];
  }
  useEffect(() => {
    dispatch({ type: GET_USER });
    dispatch(getIndoorOutdoor());
    dispatch(getDistricts());
    dispatch(getCourts());
    dispatch(getCourtTypes());
  }, []);
  return (
    <div className=" bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md p-4 my-8 mr-2 w-1/2">
      <div className="flex justify-between">
        <h2 className="font-bold text-4xl text-black">Club Details</h2>
        <img
          src="/images/edit.png"
          alt="edit-profile"
          className="w-6 h-6 object-contain cursor-pointer"
        />
      </div>
      <div className="mt-4 flex">
        <img
          src={user && user.logo_image}
          alt="profile-pic"
          className="w-32 h-32 rounded-full mr-4"
        />
        <table className="text-left w-2/3">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user && user.name}</td>
            </tr>
            <tr>
              <th>Court Quantity</th>
              <td>
                {user && user.court_quantity > numberOfCourts
                  ? user.court_quantity
                  : numberOfCourts}
              </td>
            </tr>
            <tr>
              <th>Indoor / Outdoor</th>
              <td>{user && facility}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{user && district}</td>
            </tr>
            <tr>
              <th>Surface</th>
              <td>{`${courtType1}, ${courtType2}, ${courtType3}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClubDetails;
