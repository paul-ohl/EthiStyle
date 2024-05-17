import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Article } from 'components/atoms/Article';

export function BoughtDialog(
  { setDisplayBuy, setViewedArticle, setSearchTerms, setDisplayConfirmation }:
    {
      setDisplayBuy: (displayBuy: boolean) => void,
      setViewedArticle: (article: null | Article) => void
      setSearchTerms: (searchTerms: string) => void
      setDisplayConfirmation: (displayBuy: boolean) => void,
    }
) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>
      <Dialog open={true} onClose={() => { }} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg border bg-white pt-12 px-8 pb-6 rounded-2xl text-center">
            <DialogTitle className="text-xl font-bold mb-4">Paiement réussi</DialogTitle>
            <Description className="my-2">Ton paiement a été correctement effectué</Description>
            <p className="my-2">Id de paiement: 759238974102</p>
            <button
              onClick={() => {
                setDisplayBuy(false);
                setViewedArticle(null);
                setSearchTerms("");
                setDisplayConfirmation(false);
              }}
              className="w-full mx-auto mt-8 text-white bg-lime-600 rounded-full p-2"
            >
              Retourner à l'accueil
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
