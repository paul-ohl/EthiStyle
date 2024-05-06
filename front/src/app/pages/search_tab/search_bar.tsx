import { ChangeEventHandler } from "react";

interface SearchBarProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Rechercher"
      onChange={onChange}
    />
  );
};
