import { ButtonPrimary } from "components/atoms/button";
import Input from "components/atoms/input";
import ProfilePicUpload from "components/organisms/profile-pic-upload";
import { useEffect, useState } from "react";

export function Register() {
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
      <svg className="absolute top-0 right-0 -z-10" width="101" height="267" viewBox="0 0 101 267" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M122.93 23.9735C180.448 -54.2613 244.329 78.3253 244.329 145.372C244.329 212.418 189.977 266.77 122.93 266.77C55.8841 266.77 -7.31637 215.724 1.53226 145.372C10.3809 75.02 65.4133 102.208 122.93 23.9735Z" fill="#92b5c2" />
      </svg>
      <svg className="absolute top-0 left-0 -z-10" width="237" height="213" viewBox="0 0 237 213" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M158.205 157.191C125.183 286.524 -36.9373 161.1 -59.0377 64.9774C-81.1382 -31.1454 -52.2778 -117.739 33.1762 -152.265C118.63 -186.791 188.434 -129.479 226.129 -54.0902C263.823 21.299 191.226 27.8587 158.205 157.191Z" fill="#F9F3E4" />
      </svg>

      <form className="px-7 mt-24">
        <h1 className="text-4xl font-extrabold w-1/2 mb-12">Créer un compte</h1>
        <ProfilePicUpload setValue={() => { }} />
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
        <div className="relative rounded-full">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <select
              id="country"
              name="country"
              className="h-full rounded-full border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option value="fr">🇫🇷</option>
              <option value="be">🇧🇪</option>
              <option value="he">🇨🇭</option>
            </select>
          </div>
          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            className="block w-full rounded-full border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        <div className="mt-11 mx-auto flex flex-col text-center">
          <ButtonPrimary className="bg-cyan-800 mx-auto mb-4">Etape suivante</ButtonPrimary>
          <a href="/">Annuler</a>
        </div>
      </form>
    </>
  );
}
