import { Dispatch, SetStateAction, useState } from "react";
import { FilterModal } from "./filter_modal";

export function SearchResults(
  { searchTerms }: { searchTerms: string, setSearchTerms: Dispatch<SetStateAction<string>> }
) {
  const [displayFilters, setDisplayFilters] = useState(false);

  return (
    <>
      {displayFilters && <FilterModal setDisplayFilters={setDisplayFilters} />}
      <div className="mt-2">
        <div className="flex flex-row justify-between">
          <p className="font-bold">Résultats pour <span className="truncate">"{searchTerms}"</span></p>
          <button onClick={() => setDisplayFilters(true)} className="bg-gray-300 rounded-full flex flex-row px-2 h-6">
            <svg className="mt-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
                <path d="M10.1709 14.1667H16.6473" stroke="#14142B" />
                <path d="M10.1902 5.83325H16.6666" stroke="#14142B" />
                <rect x="2.17761" y="2.96265" width="5.66667" height="5.66667" stroke="#14142A" />
                <rect x="2.17761" y="11.3452" width="5.66667" height="5.66667" stroke="#14142A" />
              </g>
            </svg>
            <p className="ml-1">Filtres</p>
          </button>
        </div>
        <div className="overflow-y-scroll grid grid-cols-2 gap-2 mt-2">
          {articles.map((article) => (
            <div key={article.id}>
              <div className="relative">
                <img className="object-cover" src={article.photo} />
                <button
                  onClick={() => {
                    // It doesn't work as of now...
                  }}
                  className="absolute bottom-1 right-2 text-orange-400"
                >
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill={article.liked ? "#DD8560" : ""} d="M1.84819 2.6978C0.272935 4.27305 0.272936 6.82703 1.84819 8.40229L7.95808 14.5122L8.00008 14.4702L8.04213 14.5122L14.152 8.40233C15.7273 6.82708 15.7273 4.2731 14.152 2.69785C12.5768 1.1226 10.0228 1.1226 8.44753 2.69785L8.35368 2.7917C8.15842 2.98696 7.84184 2.98696 7.64657 2.7917L7.55267 2.6978C5.97742 1.12254 3.42344 1.12255 1.84819 2.6978Z" stroke="#DD8560" />
                  </svg>
                </button>
              </div>
              <p>{article.name}</p>
              <div className="flex flex-row justify-between">
                <p className="text-gray-500">{article.size}</p>
                <p className="text-orange-400">{article.price}E</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const articles = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=1",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=2",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=3",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=4",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=5",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=6",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=7",
    liked: Math.random() > 0.5,
  },
];
