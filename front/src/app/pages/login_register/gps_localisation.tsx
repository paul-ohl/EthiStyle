import { ButtonPrimary } from 'components/atoms/button/button';
import React from 'react';

const GpsLocalisation: React.FC = () => {
  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, (e) => console.warn(e), { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
  }
  function success(pos: GeolocationPosition) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-orange-50 w-28 h-28 rounded-full flex items-center justify-center">
        <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_16_1525" maskUnits="userSpaceOnUse" x="4" y="4" width="55" height="54">
            <path d="M12.9386 42.9937C8.18737 44.419 5.25 46.3878 5.25 48.5626C5.25 52.9122 17.0021 56.4376 31.5 56.4376C45.9979 56.4376 57.75 52.9122 57.75 48.5626C57.75 46.3878 54.8113 44.419 50.0614 42.9937" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M31.5 45.9375C31.5 45.9375 48.5625 34.7865 48.5625 21.8951C48.5625 12.7024 40.9237 5.25 31.5 5.25C22.0762 5.25 14.4375 12.7024 14.4375 21.8951C14.4375 34.7865 31.5 45.9375 31.5 45.9375Z" fill="white" stroke="white" strokeWidth="1.66667" strokeLinejoin="round" />
            <path d="M31.5 28.875C33.2405 28.875 34.9097 28.1836 36.1404 26.9529C37.3711 25.7222 38.0625 24.053 38.0625 22.3125C38.0625 20.572 37.3711 18.9028 36.1404 17.6721C34.9097 16.4414 33.2405 15.75 31.5 15.75C29.7595 15.75 28.0903 16.4414 26.8596 17.6721C25.6289 18.9028 24.9375 20.572 24.9375 22.3125C24.9375 24.053 25.6289 25.7222 26.8596 26.9529C28.0903 28.1836 29.7595 28.875 31.5 28.875Z" fill="black" stroke="black" strokeWidth="1.66667" strokeLinejoin="round" />
          </mask>
          <g mask="url(#mask0_16_1525)">
            <path d="M0 0H63V63H0V0Z" fill="#256A86" />
          </g>
        </svg>
      </div>
      <h1 className="text-2xl font-bold mt-10">Quelle est ta localisation ?</h1>
      <p className="text-base m-8 text-center">Nous avons besoin de ta localisation pour te proposer la recherche à proximité et rendre les transactions plus écologique</p>
      <ButtonPrimary onClick={getLocation}>Activer la localisation</ButtonPrimary>
      <p className='mt-6 underline decoration-gray-700 text-gray-700'><a href='#'>Ajouter la localisation manuellement</a></p>
    </div>
  );
};

export default GpsLocalisation;
