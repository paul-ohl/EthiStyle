import { Article } from "components/atoms/Article";
import { ArticleCard } from "components/organisms/article_card";
import { useState } from "react";

export const ArticlePresentation = (
  { article, setDisplayBuy, setViewedArticle }:
    { article: Article, setDisplayBuy: (isDisplayed: boolean) => void, setViewedArticle: (article: null | Article) => void }
) => {
  const [liked, setLiked] = useState(article.liked);
  const [openDescription, setOpenDescription] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Dressing");

  return (
    <>
      <div className="relative h-4/6 -z-10">
        <div className="pt-5 p-3 bg-white bg-opacity-20">
          <div className="flex flex-row justify-between">
            <button
              className="rounded-full w-9 h-9 ring-1 ring-black flex justify-center items-center"
              onClick={() => {
                setViewedArticle(null);
              }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h2 className="font-bold font-raleway mt-2">Infos sur l'article</h2>
            <button
              onClick={() => {
                setLiked(!liked);
              }}
              className="text-orange-400"
            >
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={liked ? "#669a4e" : ""} d="M1.84819 2.6978C0.272935 4.27305 0.272936 6.82703 1.84819 8.40229L7.95808 14.5122L8.00008 14.4702L8.04213 14.5122L14.152 8.40233C15.7273 6.82708 15.7273 4.2731 14.152 2.69785C12.5768 1.1226 10.0228 1.1226 8.44753 2.69785L8.35368 2.7917C8.15842 2.98696 7.84184 2.98696 7.64657 2.7917L7.55267 2.6978C5.97742 1.12254 3.42344 1.12255 1.84819 2.6978Z" stroke="#669a4e" />
              </svg>
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50 -z-50">
          <img className="w-full h-full object-cover" src={article.photo} alt="image de l'article" />
          <div className="absolute bottom-0 left-0 font-poppins w-full bg-white bg-opacity-30">
            <h3 className="text-black font-bold text-2xl pl-3 pt-2">{article.name}</h3>
            <div className="flex flex-row justify-between pl-3">
              <div>
                <p className="text-black">Nom de la marque</p>
                <p className="text-black text-xl">{article.price.toFixed(2)}€</p>
              </div>
              <button
                onClick={() => { setDisplayBuy(true) }}
                className="rounded-full bg-black text-white px-4 my-2 mr-2 z-20"
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="font-poppins bg-white -mb-4">
        <div className="relative shadow-md shadow-gray-400 bg-white p-3 m-3 rounded-lg ring-gray-200 ring-1 my-5">
          <div onClick={() => setOpenDescription(!openDescription)} className={"absolute right-2 top-2 transition-transform " + (openDescription ? "-rotate-90" : "rotate-90")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h1 className="text-lg">Description</h1>
          <p className="text-sm">Courte description de l'article</p>
          <hr className="border-2 w-full mt-4" />
          <div className="flex flex-row h-8 my-2 items-center">
            <p>Couleur</p>
            <div className="w-8 h-8 bg-orange-500 rounded-full ml-2"></div>
            <p className="ml-5">Taille</p>
            <div className="w-8 h-8 bg-gray-400 rounded-full ml-2"><p className="mt-1 ml-2 font-bold">{article.size.charAt(0)}</p></div>
          </div>
          <hr className="border-2 w-full" />
          <p className="pt-2">Provenance: <span className="pl-2">France</span></p>
        </div>
        <div className="relative shadow-md shadow-gray-400 bg-white p-3 m-3 rounded-lg ring-gray-200 ring-1 my-5">
          <div className="ml-16">
            <img className="w-14 h-14 rounded-full absolute left-2 top-2" src="https://picsum.photos/200/300?random=1" alt="photo de profil" />
            <h3 className="text-lg">Manon Cherpin</h3>
            <p className="text-sm">Membre depuis Avril 2024</p>
          </div>
        </div>
        <div className="mx-2 my-5">
          <button
            className="rounded-full bg-black text-white p-3 text-center w-full"
            onClick={() => { setDisplayBuy(true) }}
          >
            Acheter
          </button>
          <button className="mt-2 rounded-full bg-white text-black ring-black ring-2 p-2 text-center w-full">Contacter la vendeuse</button>
        </div>
        <div className="relative flex flex-row justify-around border-b items-center mx-8 mb-2 mt-5">
          <div className={"absolute bottom-0 w-1/2 flex items-center justify-center border-b border-black " + ((selectedSection == "Dressing") ? "left-0" : "right-0")}>
          </div>
          <button
            className="text-xl text-gray-500"
            onClick={() => { setSelectedSection("Dressing") }}
          >
            Dressing
          </button>
          <button
            className="text-xl text-gray-500"
            onClick={() => { setSelectedSection("Similaires") }}
          >
            Similaires
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 m-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setViewedArticle(article);
              }}
            />
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
    photo: "https://picsum.photos/200/300?random=21",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=22",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=23",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=24",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=25",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=26",
    liked: Math.random() > 0.5,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Nom de la marque",
    size: "M/38",
    price: 2 + Math.floor(Math.random() * 20),
    photo: "https://picsum.photos/200/300?random=27",
    liked: Math.random() > 0.5,
  },
];
