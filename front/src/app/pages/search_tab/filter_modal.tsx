import RadioButtons from "components/molecules/radio_buttons";
import { Dispatch, SetStateAction, useState } from "react"

export const FilterModal = ({ setDisplayFilters }: { setDisplayFilters: Dispatch<SetStateAction<boolean>> }) => {
  const [selectedSizeType, setSelectedSizeType] = useState('clothes');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  return (
    <div className="pointer-events-none z-20 fixed inset-y-0 right-0 flex max-w-full">
      <div className="pointer-events-auto w-screen max-w-2xl">
        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
          <div className="px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-base font-bold leading-6 text-gray-900" id="slide-over-title">Filtres</h2>
              <div className="ml-3 flex h-7 items-center">
                <button onClick={() => setDisplayFilters(false)} type="button" className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg text-gray-900">Taille</h3>
              <div className="flex flex-row">
                <button
                  onClick={() => setSelectedSizeType('clothes')}
                  className={"px-2 mx-2 rounded-md text-sm text-gray-900 " + (selectedSizeType === 'clothes' ? 'bg-gray-400 ring-black ring-2' : 'bg-gray-200')}
                >
                  Vêtements
                </button>
                <button
                  onClick={() => setSelectedSizeType('shoes')}
                  className={"px-2 mx-2 rounded-md text-sm text-gray-900 " + (selectedSizeType === 'shoes' ? 'bg-gray-400 ring-black ring-2' : 'bg-gray-200')}
                >
                  Chaussures
                </button>
              </div>
            </div>
            <select className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <div className="mt-6 flex flex-row justify-between">
              <h3 className="font-bold text-lg text-gray-900">Prix</h3>
              <div className="flex flex-row">
                <input type="number" value={priceMin} onChange={(e) => setPriceMin(parseInt(e.target.value))} className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <span className="mx-2 my-1">-</span>
                <input type="number" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))} className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <RadioButtons
              options={['Le plus liké', 'Le plus récent', '+ cher au - cher', '- cher au + cher']}
              onChange={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

