import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterModal } from "./filter_modal";
import { ArticleCard } from "components/organisms/article_card";
import { Article } from "components/atoms/Article";
import { ArticlePage } from "app/article_page/main";

export function SearchResults(
  { searchTerms }: { searchTerms: string, setSearchTerms: Dispatch<SetStateAction<string>> }
) {
  const [displayFilters, setDisplayFilters] = useState(false);
  const [viewedArticle, setViewedArticle] = useState<null | Article>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {viewedArticle && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <ArticlePage article={viewedArticle} setViewedArticle={setViewedArticle} />
        </div>
      )}
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
            <ArticleCard key={article.id} article={article} onClick={() => {
              setViewedArticle(article);
            }} />
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
