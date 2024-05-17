import { Article } from "components/atoms/Article";
import { ArticlePresentation } from "./article_presentation";
import { Dispatch, SetStateAction, useState } from "react";
import { BuyPage } from "./buy_page";

export const ArticlePage = (
  { article, setViewedArticle, setSearchTerms }:
    {
      article: Article,
      setViewedArticle: (article: null | Article) => void,
      setSearchTerms: Dispatch<SetStateAction<string>>
    }
) => {
  const [displayBuy, setDisplayBuy] = useState(false);

  return (
    <div className="relative h-screen bg-white -z-30">
      {displayBuy || <ArticlePresentation article={article} setDisplayBuy={setDisplayBuy} setViewedArticle={setViewedArticle} />}
      {displayBuy && <BuyPage article={article} setDisplayBuy={setDisplayBuy} setViewedArticle={setViewedArticle} setSearchTerms={setSearchTerms} />}
    </div>
  );
}
