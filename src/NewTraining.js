import React, { useState } from "react";
import HeroTrain from "./HeroTrain";
import TrainingSuggest from "./TrainingSuggest";
import SearchTrain from "./SearchTrain";
import TrainResults from "./TrainResults";
function NewTraining() {
  return (
    <div>
      <HeroTrain />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <TrainingSuggest />
          <SearchTrain />
        </div>
        <TrainResults />
      </div>
    </div>
  );
}

export default NewTraining;
