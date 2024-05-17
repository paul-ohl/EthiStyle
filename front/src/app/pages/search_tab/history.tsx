import { Dispatch, SetStateAction, useState } from "react";

interface HistoryProps {
  setSearchTerms: Dispatch<SetStateAction<string>>;
}

export const SearchHistory: React.FC<HistoryProps> = ({ setSearchTerms }) => {
  const [history, setHistory] = useState([
    "T-shirt Blanc",
    "Pantalon denim",
    "Robe longue",
    "Pantalon coupe droite",
  ]);

  return (
    <div>
      <div className="flex justify-between py-3">
        <p className="text-lg font-raleway font-bold">Récent</p>
        <button
          className="font-bold font-raleway text-gray-600"
          onClick={() => setHistory([])}
        >
          Tout supprimer
        </button>
      </div>
      <hr />
      {history.map((searchTerm) => (
        <div key={searchTerm} className="flex justify-between py-2">
          <button onClick={() => setSearchTerms(searchTerm)} className="text-gray-600 font-poppins">{searchTerm}</button>
          <button onClick={() => setHistory(history.filter((e) => e !== searchTerm))} >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.1429C17.0495 21.1429 21.1429 17.0495 21.1429 12C21.1429 6.95057 17.0495 2.85718 12 2.85718C6.95057 2.85718 2.85718 6.95057 2.85718 12C2.85718 17.0495 6.95057 21.1429 12 21.1429Z" stroke="#707070" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.57141 8.57153L15.4286 15.4287M15.4286 8.57153L8.57141 15.4287" stroke="#707070" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
