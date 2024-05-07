import { Dispatch, SetStateAction } from "react";

export function SearchResults(
  { searchTerms, setSearchTerms }: { searchTerms: string, setSearchTerms: Dispatch<SetStateAction<string>> }
) {
  return (
    <p>{searchTerms}</p>
  );
}
