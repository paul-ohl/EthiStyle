import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ManualLocalisation() {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    return (
        <div className="p-4 pt-5">
            <div className="w-full my-2 justify-between flex items-center">
                <div className="w-9 h-9 rounded-full ring-1 ring-grey-800 flex justify-center items-center">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9999 5.4165L5.41658 12.9998M5.41658 12.9998L12.9999 20.5832M5.41658 12.9998L20.5833 12.9998" stroke="#202020" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p className="text-base font-bold">Recherche ta localisation</p>
                <div className="w-10 h-10 rounded-full ring-1 ring-grey-800 invisible"> </div>
            </div>
            <div className="relative rounded-full my-4">
                <div className="absolute inset-y-0 left-2 flex items-center">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.309 14.8501L18.7503 17.2901C18.8641 17.408 18.9271 17.5659 18.9257 17.7297C18.9243 17.8936 18.8585 18.0504 18.7427 18.1662C18.6268 18.2821 18.47 18.3478 18.3061 18.3493C18.1423 18.3507 17.9844 18.2877 17.8665 18.1739L15.4253 15.7326C13.83 17.0994 11.7673 17.7952 9.67004 17.674C7.57279 17.5527 5.60401 16.6239 4.17683 15.0824C2.74964 13.5409 1.97499 11.5065 2.01542 9.40613C2.05585 7.30577 2.90822 5.30271 4.39367 3.81726C5.87913 2.33181 7.88219 1.47944 9.98255 1.43901C12.0829 1.39858 14.1173 2.17323 15.6588 3.60041C17.2003 5.0276 18.1291 6.99637 18.2504 9.09362C18.3716 11.1909 17.6758 13.2536 16.309 14.8489V14.8501ZM10.139 16.4376C11.9624 16.4376 13.7111 15.7133 15.0004 14.424C16.2897 13.1346 17.014 11.386 17.014 9.5626C17.014 7.73924 16.2897 5.99055 15.0004 4.70124C13.7111 3.41193 11.9624 2.6876 10.139 2.6876C8.31565 2.6876 6.56697 3.41193 5.27766 4.70124C3.98835 5.99055 3.26402 7.73924 3.26402 9.5626C3.26402 11.386 3.98835 13.1346 5.27766 14.424C6.56697 15.7133 8.31565 16.4376 10.139 16.4376Z" fill="#333333" />
                    </svg>
                </div>
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-full border-0 py-1.5 pl-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Rue de la république"
                    value={address}
                    onChange={({ target }) => { setAddress(target.value) }}
                />
                <div
                    className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => { setAddress("") }}
                >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.7359 24.4733C19.4166 24.4733 24.0216 19.8682 24.0216 14.1876C24.0216 8.50693 19.4166 3.90186 13.7359 3.90186C8.05527 3.90186 3.4502 8.50693 3.4502 14.1876C3.4502 19.8682 8.05527 24.4733 13.7359 24.4733Z" stroke="#707070" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.87891 10.3306L17.5932 18.0449M17.5932 10.3306L9.87891 18.0449" stroke="#707070" strokeWidth="0.952381" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-row items-end ">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7397 28.179C21.1168 25.2069 27.125 19.1347 27.125 13.5625C27.125 10.4794 25.9002 7.52249 23.7201 5.34238C21.54 3.16227 18.5831 1.9375 15.5 1.9375C12.4169 1.9375 9.45999 3.16227 7.27988 5.34238C5.09977 7.52249 3.875 10.4794 3.875 13.5625C3.875 19.1347 9.88125 25.2069 13.2603 28.179C13.8766 28.7291 14.6738 29.0332 15.5 29.0332C16.3262 29.0332 17.1234 28.7291 17.7397 28.179ZM11.625 13.5625C11.625 12.5348 12.0333 11.5492 12.76 10.8225C13.4867 10.0958 14.4723 9.6875 15.5 9.6875C16.5277 9.6875 17.5133 10.0958 18.24 10.8225C18.9667 11.5492 19.375 12.5348 19.375 13.5625C19.375 14.5902 18.9667 15.5758 18.24 16.3025C17.5133 17.0292 16.5277 17.4375 15.5 17.4375C14.4723 17.4375 13.4867 17.0292 12.76 16.3025C12.0333 15.5758 11.625 14.5902 11.625 13.5625Z" fill="#202020" />
                </svg>
                <p className="ml-2">Utiliser ma localisation actuelle</p>
            </div>
            <hr className="mt-3 mb-2" />
            <div className="w-full justify-between flex flex-col">
                <p className="text-sm mb-2 text-gray-500 font-md">Résultat de la recherche</p>
                {locations.map((location) => (
                    <button onClick={() => navigate('/', { replace: true })} key={location.street + location.city} className="flex flex-col text-left ml-1 my-2">
                        <div className="flex flex-row items-end">
                            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.7397 28.179C21.1168 25.2069 27.125 19.1347 27.125 13.5625C27.125 10.4794 25.9002 7.52249 23.7201 5.34238C21.54 3.16227 18.5831 1.9375 15.5 1.9375C12.4169 1.9375 9.45999 3.16227 7.27988 5.34238C5.09977 7.52249 3.875 10.4794 3.875 13.5625C3.875 19.1347 9.88125 25.2069 13.2603 28.179C13.8766 28.7291 14.6738 29.0332 15.5 29.0332C16.3262 29.0332 17.1234 28.7291 17.7397 28.179ZM11.625 13.5625C11.625 12.5348 12.0333 11.5492 12.76 10.8225C13.4867 10.0958 14.4723 9.6875 15.5 9.6875C16.5277 9.6875 17.5133 10.0958 18.24 10.8225C18.9667 11.5492 19.375 12.5348 19.375 13.5625C19.375 14.5902 18.9667 15.5758 18.24 16.3025C17.5133 17.0292 16.5277 17.4375 15.5 17.4375C14.4723 17.4375 13.4867 17.0292 12.76 16.3025C12.0333 15.5758 11.625 14.5902 11.625 13.5625Z" fill="#202020" />
                            </svg>
                            <p className="ml-2">{location.street}</p>
                        </div>
                        <p className="text-base text-gray-500 mt-1 ml-1.5">{location.city}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

const locations = [
    {
        street: 'Rue de la république',
        city: '69000 Lyon',
    },
    {
        street: 'Rue de la paix',
        city: '69000 Lyon',
    }
]
