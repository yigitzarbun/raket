import React, { useState, useEffect } from "react";
import MatchResults from "./MatchResults";
import MatchSuggest from "./MatchSuggest";
import SearchMatch from "./SearchMatch";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "./redux stuff/actions";

function NewMatch() {
  const dispatch = useDispatch();
  const { players } = useSelector((store) => store);
  const [filter, setFilter] = useState("");
  const handleMatch = (data) => {
    const dataWide = {
      club_preference_id: Number(data.location),
      level_id: Number(data.level),
      // ranking: data.ranking,
    };
    setFilter(dataWide);
  };
  useEffect(() => {
    dispatch(getPlayers());
  }, []);
  return (
    <div>
      <div className="bg-heroMatch bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <MatchSuggest />
          <SearchMatch handleMatch={handleMatch} />
        </div>
        <MatchResults players={players} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default NewMatch;
