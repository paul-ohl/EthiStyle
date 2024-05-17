import { Article } from "components/atoms/Article";

export function ArticleCard(
  { article, onClick }:
    { article: Article, onClick: () => void }
) {
  return (
    <a onClick={onClick} key={article.id}>
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
      <p className="font-tenor">{article.name}</p>
      <div className="flex flex-row justify-between font-tenor">
        <p className="text-gray-500">{article.size}</p>
        <p className="text-orange-400">{article.price.toFixed(2)}€</p>
      </div>
    </a>
  );
}
