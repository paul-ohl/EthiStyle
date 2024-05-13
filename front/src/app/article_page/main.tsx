import { useState } from "react";

export const ArticlePage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 -z-50">
        <img className="w-full h-80 object-cover" src="https://picsum.photos/200/300?random=7" alt="image de l'article" />
        <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-50">
          <h3 className="text-black font-bold text-2xl p-3">Nom du produit</h3>
          <div className="flex flex-row justify-between p-3">
            <div>
              <p className="text-black">Nom de la marque</p>
              <p className="text-black text-xl">12e</p>
            </div>
            <button className="rounded-full bg-black text-white px-4 my-2">
              Acheter
            </button>
          </div>
        </div>
      </div >
      <div className="p-3">
        <div className="flex flex-row justify-between">
          <button
            className="rounded-full w-9 h-9 ring-1 ring-grey-800 flex justify-center items-center"
            onClick={() => {
              // setShowHistory(false);
              // setSearchTerms("");
            }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="font-bold mt-2">Infos sur l'article</h2>
          <button
            onClick={() => {
              setLiked(!liked);
            }}
            className="text-orange-400"
          >
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill={liked ? "#DD8560" : ""} d="M1.84819 2.6978C0.272935 4.27305 0.272936 6.82703 1.84819 8.40229L7.95808 14.5122L8.00008 14.4702L8.04213 14.5122L14.152 8.40233C15.7273 6.82708 15.7273 4.2731 14.152 2.69785C12.5768 1.1226 10.0228 1.1226 8.44753 2.69785L8.35368 2.7917C8.15842 2.98696 7.84184 2.98696 7.64657 2.7917L7.55267 2.6978C5.97742 1.12254 3.42344 1.12255 1.84819 2.6978Z" stroke="#DD8560" />
            </svg>
          </button>
        </div>
      </div>
      <h1 className="p-3">Description</h1>
    </div>
  );
}
