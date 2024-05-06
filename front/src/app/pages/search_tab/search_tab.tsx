import { SearchBar } from "./search_bar";

export const SearchTab = () => {
  return (
    <div className="flex flex-col">
      <h2>Toutes les catégories</h2>
      <SearchBar onChange={console.log} />
    </div>
  );
}
