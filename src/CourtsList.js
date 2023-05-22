import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourts, GET_USER, deleteCourt } from "./redux stuff/actions";

function CourtsList() {
  const dispatch = useDispatch();
  let { courts, user } = useSelector((store) => store);
  if (user.club) {
    user = user.club;
  } else {
    user = user;
  }
  const handleDeleteCourt = (court) => {
    dispatch(deleteCourt(court.court_id));
    console.log(court);
  };
  useEffect(() => {
    dispatch(getCourts());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
        <h2 className="font-bold text-4xl text-white ">Courts</h2>
        <div className="bg-slate-800 text-white rounded-md p-4 mt-8">
          {Array.isArray(courts) &&
          courts &&
          courts.length > 0 &&
          user &&
          courts.filter((c) => c.club_id === user.club_id).length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="h-12">
                  <th>Court Name / No.</th>
                  <th>Surface</th>
                  <th>Indoor / Outdoor</th>
                  <th>Price per hour</th>
                  <th className="text-green-400">Opening hour</th>
                  <th className="text-red-500">Closing hour</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(courts) &&
                  courts &&
                  courts.length > 0 &&
                  courts
                    .filter((c) => c.club_id === user.club_id)
                    .map((c) => (
                      <tr className="h-12" key={c.court_id}>
                        <td className="text-slate-300">{c.court_name}</td>
                        <td>{c.court_type}</td>
                        <td>{c.indoor_outdoor}</td>
                        <td>TL {c.price}</td>
                        <td className="text-green-400">
                          {c.opening < 1000
                            ? "0" +
                              c.opening.toString()[0] +
                              ":" +
                              c.opening.toString()[1] +
                              c.opening.toString()[2]
                            : c.opening.toString()[0] +
                              c.opening.toString()[1] +
                              ":" +
                              c.opening.toString()[2] +
                              c.opening.toString()[3]}
                        </td>
                        <td className="text-red-500">
                          {c.closing < 1000
                            ? "0" +
                              c.closing.toString()[0] +
                              ":" +
                              c.closing.toString()[1] +
                              c.closing.toString()[2]
                            : c.closing.toString()[0] +
                              c.closing.toString()[1] +
                              ":" +
                              c.closing.toString()[2] +
                              c.closing.toString()[3]}
                        </td>
                        <td className="py-1 px-4 border-2  border-blue-500 rounded-md hover:bg-blue-500 hover:text-white ml-2 mt-2">
                          Edit
                        </td>
                        <td onClick={() => handleDeleteCourt(c)}>Remove</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : (
            <p>No courts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourtsList;
