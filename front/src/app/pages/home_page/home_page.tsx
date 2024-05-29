import { SelectedTab } from "../main_page/main_page"

export const HomePage = (
  { setSearchTerms, setSelectedTab }:
    {
      setSearchTerms: React.Dispatch<React.SetStateAction<string>>,
      setSelectedTab: React.Dispatch<React.SetStateAction<SelectedTab>>
    }
) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl m-10 font-bold text-center">Home</h1>
      </div>
      <button
        onClick={() => {
          setSearchTerms('Parapluies')
          setSelectedTab(SelectedTab.Search)
        }}
        className="bg-cyan-600 rounded-full p-3"
      >
        Parapluies
      </button>
    </div>
  )
}
