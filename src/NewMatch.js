import React from "react";
import MatchResults from "./MatchResults";
import MatchSuggest from "./MatchSuggest";
import SearchMatch from "./SearchMatch";
function NewMatch() {
  return (
    <div>
      <div className="bg-heroMatch bg-center bg-cover py-28 rounded-md mt-4"></div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <MatchSuggest />
          <SearchMatch />
        </div>
        <MatchResults />
      </div>
    </div>
  );
}

export default NewMatch;
