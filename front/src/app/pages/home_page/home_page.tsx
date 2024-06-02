import { ArticleCard } from "components/organisms/article_card";
import { SelectedTab } from "../main_page/main_page"

export const HomePage = (
  { setSearchTerms, setSelectedTab }:
    {
      setSearchTerms: React.Dispatch<React.SetStateAction<string>>,
      setSelectedTab: React.Dispatch<React.SetStateAction<SelectedTab>>
    }
) => {
  const categories = [
    'Robes',
    'Pantalons',
    'T-shirts',
    'Jupes',
    'Shorts',
  ];

  return (
    <div className="relative px-3 pt-8">
      <div className="relative rounded-lg bg-girafon p-2">
        <div className="flex flex-row">
          <img className="w-8 h-8 aspect-square object-cover rounded-full" src="images/girafon_logo.webp" alt="Girafon logo" />
          <p className="font-bold text-sm font-raleway text-gray-700 mt-2 ml-2">Girafon bleu</p>
        </div>
        <p className="font-poppins text-xs w-1/2">
          La marque éco responsable qui sauve les girafes
        </p>
        <img className="w-1/2 h-full absolute right-0 top-0 rounded-lg object-cover" src="images/girafon.webp" alt="two people wearing Girafon bleu clothes" />
      </div>
      <div className="font-poppins">
        <h3 className="text-lg mt-5 mt-5 mb-2  ml-1">Catégories</h3>
        <div className="flex flex-row font-raleway">
          {categories.map((category) => (
            <a
              key={category}
              onClick={() => {
                setSearchTerms(category)
                setSelectedTab(SelectedTab.Search)
              }}
              className="mx-1 cursor-pointer"
            >
              <img
                src={`https://picsum.photos/seed/${category}/200/200`}
                alt={category + ' search'}
                className="rounded-full p-1 shadow-gray-400 shadow-md object-cover"
              />
              <p className="text-xs mt-2 text-center">{category}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg my-2 ml-1 font-poppins">Suggestions</h3>
        <div className="grid grid-cols-2 gap-2 m-2">
          {suggestedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const suggestedArticles = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/fujiphilm-ojZ4wJNUM5w-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/frank-flores-eyFcZLLYvfA-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/engin-akyurt-jaZoffxg1yc-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/engin-akyurt-5raPrOhbKQo-unsplash.jpg",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "./images/unsplash/dom-hill-nimElTcTNyY-unsplash.jpg",
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
];
