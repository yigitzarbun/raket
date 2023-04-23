import React, { useState, useEffect } from "react";
import HeroTrain from "./HeroTrain";
import TrainingSuggest from "./TrainingSuggest";
import SearchTrain from "./SearchTrain";
import TrainResults from "./TrainResults";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "./redux stuff/actions";
function NewTraining() {
  const dispatch = useDispatch();
  const players = useSelector((store) => store.players);
  const [filter, setFilter] = useState("");
  const handleTrain = (data) => {
    const dataWide = {
      club_preference_id: Number(data.club_preference_id),
      level_id: Number(data.level_id),
      gender_id: Number(data.gender_id),
    };
    setFilter(dataWide);
  };
  useEffect(() => {
    dispatch(getPlayers());
  }, []);
  return (
    <div>
      <HeroTrain />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <TrainingSuggest />
          <SearchTrain handleTrain={handleTrain} />
        </div>
        <TrainResults players={players} filter={filter} />
      </div>
    </div>
  );
}

export default NewTraining;
