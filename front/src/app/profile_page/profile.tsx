import { ArticleCard } from "components/organisms/article_card";
import { useRef } from "react";

export function Profile() {
  const grade = useRef(4.325);

  return (
    <div>
      <div className="relative m-3 mt-5">
        <img className="absolute top-0 left-0 w-12 h-12 rounded-full ring-white ring-1 shadow-gray-500" src="./images/person.jpg" />
        <div className="ml-16 flex-row flex">
          <p className="text-lg">Alice Gilbert</p>
          <p className="text-xs bg-lime-600 text-white rounded-full ml-2 pt-1.5 px-1.5">Super-Green</p>
        </div>
        <div className="ml-16 mt-1 flex-row flex">
          <p className="text-sm -translate-y-0.5 text-gray-700">{grade.current.toFixed(1)}</p>
          <div className="flex-row flex ml-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg className="mx-0.5" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.23672 0.247071L10.2375 4.98259L15.3598 5.42264C15.715 5.45332 15.8596 5.89659 15.5899 6.12994L11.7046 9.49607L12.8689 14.5037C12.9496 14.8517 12.5726 15.1254 12.2674 14.9405L7.86531 12.2857L3.46325 14.9405C3.15724 15.1246 2.78098 14.8509 2.86173 14.5037L4.02602 9.49607L0.139911 6.12913C-0.129767 5.89578 0.0139536 5.45251 0.370026 5.42183L5.4923 4.98178L7.49309 0.247071C7.63196 -0.0823569 8.09785 -0.0823569 8.23672 0.247071L8.23672 0.247071Z" fill={(i <= grade.current) ? "#ECA61B" : ""} stroke="#ECA61B" stroke-width={(i > grade.current) ? "1" : "0"} />
              </svg>
            ))}
          </div>
          <p className="text-sm -translate-y-0.5 ml-1 text-gray-500">({Math.floor(Math.random() * 50)})</p>
        </div>
      </div>
      <div className="mx-3 my-4">
        <button className="rounded-xl bg-gray-50 flex flex-row justify-between p-2 w-full">
          <p className="ml-2">Voir mon dressing</p>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#256A85" />
            <path d="M16.6716 9.29492L15.4919 10.4987L19.2476 14.146H8.08899V15.8312H19.2476L15.4919 19.4785L16.6716 20.6822L22.5458 14.9886L16.6716 9.29492Z" fill="white" />
          </svg>
        </button>
      </div>
      <div className="mx-3">
        <div className="flex flex-row justify-between p-2 w-full">
          <p className="ml-2 text-xl font-bold">Mes Achats</p>
          <div className={"translate-y-2"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="-translate-y-3 flex flex-row justify-between p-2 w-full">
          <button className="rounded-full bg-gray-200 p-1 w-full">
            En cours
          </button>
          <button className="rounded-full bg-gray-200 p-1 w-full mx-2">
            Terminé
          </button>
          <button className="rounded-full bg-gray-200 p-1 w-full">
            Annulé
          </button>
        </div>
      </div>
      <div className="mx-3">
        <div className="flex flex-row justify-between p-2 w-full">
          <p className="ml-2 text-xl font-bold">Mes favoris</p>
          <div className={"translate-y-2"}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 m-2">
          {likedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => { }}
            />
          ))}
        </div>
      </div>
    </div >
  );
}

const likedArticles = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=21",
    liked: true,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=22",
    liked: true,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=23",
    liked: true,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=24",
    liked: true,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=25",
    liked: true,
  },
];
