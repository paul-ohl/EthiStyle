import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterModal } from "./filter_modal";
import { ArticleCard } from "components/organisms/article_card";
import { Article } from "components/atoms/Article";
import { ArticlePage } from "app/pages/article_page/main";

export function SearchResults(
  { searchTerms, setSearchTerms }: { searchTerms: string, setSearchTerms: Dispatch<SetStateAction<string>> }
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
          <ArticlePage article={viewedArticle} setViewedArticle={setViewedArticle} setSearchTerms={setSearchTerms} />
        </div>
      )}
      {displayFilters && <FilterModal setDisplayFilters={setDisplayFilters} />}
      <div>
        <div className="mt-1 mb-5 flex flex-row justify-between">
          <p className="text-xs font-tenor text-teal-700 translate-y-1">RÉSULTATS POUR <span className="truncate">"{searchTerms.toUpperCase()}"</span></p>
          <button onClick={() => setDisplayFilters(true)} className="bg-gray-50 text-teal-700 rounded-full flex flex-row px-2 h-6">
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
    photo: "./images/unsplash/zoe-NKjIT7u5nXE-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/alexandra-gorn-WF0LSThlRmw-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/alyssa-strohmann-TS--uNw-JqE-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/amanda-vick-ohWf6YuzOQk-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/angela-bailey-jlo7Bf4tUoY-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/anomaly-WWesmHEgXDs-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/becca-mchaffie-Fzde_6ITjkw-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/keagan-henman-xPJYL0l5Ii8-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/kemal-alkan-_BDBEP0ePQc-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/laura-chouette-kFY-NlRbgDY-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/laura-chouette-yPZQAzuySJk-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/manki-kim-veuKI2tN9xU-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/mediamodifier-7cERndkOyDw-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/mediamodifier-JskqEILt-ds-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/mediamodifier-ogmenj2NGho-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/milada-vigerova-p8Drpg_duLw-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/nimble-made-NS2BZsGxOLE-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/priscilla-du-preez-my5cwTzhmNI-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/rocknwool-JgDbCod2gg4-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/sarah-brown-oa7pqZmmhuA-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/sarah-dorweiler-gUPiTDBdRe4-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/sincerely-media-9ShY-Tq70Mc-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/tobias-tullius-Fg15LdqpWrs-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/vic-domic-uhzMXsQ7hBA-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: './images/unsplash/zoe-NKjIT7u5nXE-unsplash.jpg',
    liked: Math.random() > 0.5,
  },
];

