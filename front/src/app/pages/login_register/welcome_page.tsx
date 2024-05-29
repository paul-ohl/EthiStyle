import { ButtonPrimary } from "components/atoms/button";

export function WelcomePage() {
  return (
    <div className="flex flex-col h-screen">
      <div
        id="images-section"
        className="flex-grow flex w-full justify-center py-6"
      >
        <img
          className="mx-23 w-2/5 mr-4 rounded-full object-cover z-10"
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c"
          alt="A blue shirt with small white hearts printed on it"
        />
        <div className="w-2/5 flex flex-col">
          <img
            className="mx-23 flex-grow rounded-full object-cover z-10"
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e"
            alt="Clothes hanging with a beautiful plant"
          />
          <img
            className="aspect-square rounded-full flex-shrink mx-23 mt-4 z-10"
            src="https://images.unsplash.com/photo-1602293589930-45aad59ba3ab"
            alt="A pair of jeans hanging on a hanger"
          />
          <svg
            className="absolute top-0 left-0 z-0"
            width="232"
            height="246"
            viewBox="0 0 232 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M231.5 107C231.5 183.461 165.27 245.5 83.5 245.5C1.73021 245.5 -64.5 183.461 -64.5 107C-64.5 30.5392 1.73021 -31.5 83.5 -31.5C165.27 -31.5 231.5 30.5392 231.5 107Z"
              stroke="#B1C7C8"
            />
          </svg>
          <svg
            className="absolute top-44 right-0 z-0"
            width="102"
            height="231"
            viewBox="0 0 102 231"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M246.5 115.5C246.5 178.982 191.463 230.5 123.5 230.5C55.5369 230.5 0.5 178.982 0.5 115.5C0.5 52.0183 55.5369 0.5 123.5 0.5C191.463 0.5 246.5 52.0183 246.5 115.5Z"
              stroke="#B1C7C8"
            />
          </svg>
        </div>
      </div>
      <div className="font-poppins flex-shrink-0 flex flex-col items-center w-5/6 mx-auto">
        <h1 className="mb-3 text-2xl text-center">
          Achète et vend de façon écoresponsable
        </h1>
        <h2 className="mb-5 text-center text-sm text-gray-600">
          Aucun compromis sur la mode. <br />
          Aucun compromis sur la planète. <br />
          Aucun compromis sur ton style. <br />
        </h2>
        <div className="w-full px-3">
          <ButtonPrimary onClick={() => { window.location.assign("/register") }} className="bg-cyan-800">Créer un compte</ButtonPrimary>
        </div>
        <p className="mb-7 mt-4 text-cyan-700 text-center">
          Tu as déjà un compte?{" "}<br />
          <a className="font-bold text-sm underline decoration-solid" href="/login">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
