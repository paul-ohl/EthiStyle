import Input from "components/atoms/input";
import { useEffect, useState } from "react";

export function Login({ handleLogin }: { handleLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setPasswordError(password === "" || password.length >= 8 ? "" : "Minimum 8 caractères");
    }, [password]);

    useEffect(() => {
        const isValid = email === "" || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        setEmailError(isValid ? "" : "Email invalide");
        // if (isValid) {
        // Fetch the email to check if it's already in use
        // setEmailError("Email déjà utilisé");
        //   setEmailError("");
        // }
    }, [email]);

    return (
        <>
            <svg className="-z-20 absolute top-0 left-0" width="247" height="271" viewBox="0 0 247 271" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.4357 -132.222C140.874 -262.036 246.871 -42.0359 246.871 69.214C246.871 180.464 156.686 270.65 45.4357 270.65C-65.8142 270.65 -156 180.464 -156 69.214C-156 -42.0359 -50.0024 -2.40715 45.4357 -132.222Z" fill="#D9D9D9" />
            </svg>
            <svg className="-z-30 absolute top-0 left-0" width="296" height="331" viewBox="0 0 296 331" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M201.008 266.329C161.149 422.443 -19.5441 258.169 -61.2191 155.02C-102.894 51.8713 -53.0593 -65.5318 50.0897 -107.207C153.239 -148.882 237.498 -79.7027 282.998 11.2973C328.498 102.297 240.867 110.215 201.008 266.329Z" fill="#F2F5FE" />
            </svg>
            <svg className="absolute right-0 top-56" width="84" height="138" viewBox="0 0 84 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.568 131.879C-4.23079 159.118 -6.7409 75.772 8.70952 41.0698C24.1599 6.36764 64.8167 -9.23903 99.5189 6.21139C134.221 21.6618 149.828 62.3185 134.377 97.0207C118.927 131.723 91.3667 104.641 43.568 131.879Z" fill="#92b5c2" />
            </svg>
            <svg className="absolute bottom-0 right-0 -z-20" width="254" height="350" viewBox="0 0 254 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M393.592 235.647C487.561 366.529 245.573 399.355 139.768 364.976C33.9634 330.598 -23.9395 216.958 10.4386 111.153C44.8167 5.34777 151.971 -14.7308 250.928 8.90784C349.885 32.5465 299.623 104.765 393.592 235.647Z" fill="#F2F5FE" />
            </svg>

            <div className="bottom-0 left-0 right-0 font-poppins absolute px-5 mb-24">
                <h1 className="text-3xl font-poppins font-extrabold w-1/2 mb-4">Connexion</h1>
                <h3 className="text-base mb-4">C'est bon de te revoir!</h3>
                <form className="mx-2">
                    <Input name="Email" setValue={setEmail} error={emailError} type="email" />
                    <Input name="Password" setValue={setPassword} error={passwordError} type={showPassword ? "text" : "password"}>
                        <div
                            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => setShowPassword((sp) => !sp)}
                        >
                            <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M9.99719 6.80063L6.66366 10.1342C6.23544 9.70594 5.97192 9.1196 5.97192 8.46739C5.97192 7.16297 7.026 6.10889 8.33043 6.10889C8.98264 6.10889 9.56897 6.37241 9.99719 6.80063Z" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.1646 4.36348C11.0117 3.49387 9.69411 3.01953 8.3304 3.01953C6.00483 3.01953 3.83738 4.38984 2.32872 6.76152C1.7358 7.69043 1.7358 9.25178 2.32872 10.1807C2.84918 10.9976 3.45527 11.7025 4.11407 12.2691" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.97192 13.4282C6.72296 13.7444 7.5201 13.9157 8.33043 13.9157C10.656 13.9157 12.8234 12.5454 14.3321 10.1737C14.925 9.24484 14.925 7.68348 14.3321 6.75457C14.1147 6.41199 13.8775 6.08918 13.6338 5.78613" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.643 8.92871C10.4717 9.85762 9.71406 10.6152 8.78516 10.7865" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.66343 10.1343L1.74219 15.0555" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.9186 1.87988L9.99731 6.80112" stroke="#1F1F1F" strokeWidth="0.988201" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </Input>
                    <p className="text-center mb-4 text-gray-500">Tu as oublié ton <a href="/lost-password" className="underline decoration-black">mot de passe ?</a></p>
                    <div className="mt-11 mx-auto flex flex-col text-center">
                        <button
                            disabled={passwordError !== "" || emailError !== ""}
                            className={"w-3/4 mx-auto mb-4 text-white text-xl leading-6 font-medium py-3 px-6 border border-transparent rounded-full focus:outline-none transition-colors " + ((passwordError !== "" || emailError !== "") ? "bg-gray-600" : "bg-cyan-800")}
                            onClick={() => { handleLogin() }}
                        >
                            Me connecter
                        </button>
                        <a href="/">Annuler</a>
                    </div>
                </form>
            </div>
        </>
    );
}
