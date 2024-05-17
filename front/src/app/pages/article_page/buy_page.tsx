import { Article } from "components/atoms/Article";
import { HorizontalSeparator } from "components/atoms/horizontal_separator";
import { BoughtDialog } from "./bought_dialog";
import { useState } from "react";

export const BuyPage = (
  { article, setDisplayBuy, setViewedArticle, setSearchTerms }:
    {
      article: Article,
      setDisplayBuy: (isDisplayed: boolean) => void,
      setViewedArticle: (article: null | Article) => void,
      setSearchTerms: (searchTerms: string) => void
    }
) => {
  const [displayConfirmation, setDisplayConfirmation] = useState(false);

  return (
    <>
      {displayConfirmation &&
        <BoughtDialog setDisplayBuy={setDisplayBuy} setViewedArticle={setViewedArticle} setSearchTerms={setSearchTerms} setDisplayConfirmation={setDisplayConfirmation} />
      }
      <div className="pt-5 p-3 bg-white bg-opacity-20">
        <div className="flex flex-row justify-between">
          <button
            className="rounded-full w-9 h-9 ring-1 ring-black flex justify-center items-center"
            onClick={() => {
              setDisplayBuy(false);
            }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="font-bold font-raleway mt-2">Confirmation d'achat</h2>
          <div className="invisible"></div>
        </div>
      </div>
      <div className="p-4 font-tenor">
        <h3 className="text-xl">Alice Gilbert</h3>
        <p className="text-sm text-gray-700">14 rue des tulipes,</p>
        <p className="text-sm text-gray-700">69100 Villeurbanne</p>
        <p className="text-sm text-gray-700">06 00 00 00 00</p>
        <HorizontalSeparator className="my-4" />
        <div className="flex flex-row">
          <img className="w-20 object-cover" src="https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg" />
          <p className="text-md text-gray-700">Master Card ******39</p>
        </div>
        <HorizontalSeparator className="my-4" />
        <div className="relative w-full">
          <img src={article.photo} className="absolute left-0 w-24 object-cover aspect-square" />
          <div className="ml-28">
            <p className="float-right ml-1 text-xl text-orange-600">{article.price.toFixed(2)}€</p>
            <p className="text-sm">{article.name}</p>
            <p className="text-gray-600">{article.size}</p>
            <div className="relative mt-2">
              <img className="absolute left-0 w-10 h-10 rounded-full" src="https://picsum.photos/100/100" />
              <p className="font-bold ml-12 pt-1.5">Manon Cherpin</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 left-0 w-full px-4">
          <div className="w-full flex flex-row justify-between my-4 px-2">
            <p className="text-gray-800">TOTAL</p>
            <p className="text-orange-600 font-bold">{article.price.toFixed(2)}€</p>
          </div>
          <button
            className="flex flex-row justify-center bg-cyan-800 text-white font-bold text-xl p-3 rounded-full w-full"
            onClick={() => { setDisplayConfirmation(true) }}
          >
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.37216 22.2891L4.15184 6.46143H19.7784L20.5581 22.2891H3.37216Z" stroke="#FCFCFC" />
              <path d="M7.82031 9.72627L7.82031 5.32017C7.82031 4.22094 8.25698 3.16674 9.03425 2.38947C9.81152 1.6122 10.8657 1.17554 11.9649 1.17554C13.0642 1.17554 14.1184 1.6122 14.8956 2.38947C15.6729 3.16674 16.1096 4.22094 16.1096 5.32017V9.72627" stroke="#FCFCFC" />
            </svg>
            <p className="ml-5">Valider et acheter</p>
          </button>
        </div>
      </div>
    </>
  );
}
