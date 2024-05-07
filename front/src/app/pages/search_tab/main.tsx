import { useEffect, useState } from "react";
import { SearchBar } from "./bar";
import { AllCategories } from "./categories";
import { SearchHistory } from "./history";
import { SearchResults } from "./results";

export const SearchTab = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    setShowHistory(false);
  }, [searchTerms]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row">
        {(searchTerms !== "" || showHistory) && <button
          className="rounded-full w-9 h-9 ring-1 ring-grey-800 flex justify-center items-center"
          onClick={() => {
            setShowHistory(false);
            setSearchTerms("");
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>}
        <h2 className="font-bold ml-2 mb-3 my-1">{searchTerms === "" && !showHistory ? "Toutes les catégories" : "Rechercher un article"}</h2>
      </div>
      <SearchBar
        onFocus={() => {
          setShowHistory(true);
        }}
        onSubmit={(e) => {
          if (e.target.value !== "") {
            setShowHistory(false);
            setSearchTerms(e.target.value);
          }
        }}
      />
      {showHistory && <SearchHistory setSearchTerms={setSearchTerms} />}
      {!showHistory && (searchTerms === "" ? <AllCategories setSearchTerms={setSearchTerms} /> : <SearchResults searchTerms={searchTerms} setSearchTerms={setSearchTerms} />)}
    </div>
  );
}

