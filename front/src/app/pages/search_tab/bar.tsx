import { ChangeEventHandler } from "react";

interface SearchBarProps {
  onFocus: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (element: string | null | undefined) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const element = (e.target as HTMLFormElement).search.value;
        onSubmit(element);
      }}
      className="my-4 relative rounded-full"
    >
      <div className="absolute inset-y-0 left-3 flex items-center">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.309 14.8499L18.7503 17.2899C18.8641 17.4077 18.9271 17.5656 18.9257 17.7295C18.9243 17.8934 18.8585 18.0501 18.7427 18.166C18.6268 18.2819 18.47 18.3476 18.3061 18.349C18.1423 18.3505 17.9844 18.2875 17.8665 18.1736L15.4253 15.7324C13.83 17.0992 11.7673 17.7949 9.67004 17.6737C7.57279 17.5525 5.60401 16.6237 4.17683 15.0821C2.74964 13.5406 1.97499 11.5062 2.01542 9.40589C2.05585 7.30553 2.90822 5.30247 4.39367 3.81701C5.87913 2.33156 7.88219 1.47919 9.98255 1.43876C12.0829 1.39833 14.1173 2.17298 15.6588 3.60017C17.2003 5.02735 18.1291 6.99613 18.2504 9.09338C18.3716 11.1906 17.6758 13.2533 16.309 14.8486V14.8499ZM10.139 16.4374C11.9624 16.4374 13.7111 15.713 15.0004 14.4237C16.2897 13.1344 17.014 11.3857 17.014 9.56236C17.014 7.73899 16.2897 5.99031 15.0004 4.701C13.7111 3.41169 11.9624 2.68736 10.139 2.68736C8.31565 2.68736 6.56697 3.41169 5.27766 4.701C3.98835 5.99031 3.26402 7.73899 3.26402 9.56236C3.26402 11.3857 3.98835 13.1344 5.27766 14.4237C6.56697 15.713 8.31565 16.4374 10.139 16.4374Z" fill="#333333" />
        </svg>
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="font-poppins block w-full rounded-full border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-100"
        placeholder="Rechercher"
        onFocus={onFocus}
      />
    </form>
  );
};
