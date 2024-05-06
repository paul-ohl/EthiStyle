import { ButtonPrimary } from "components/atoms/button/button";
import Input from "components/atoms/input";
import { SecretCode } from "components/molecules/secret_code";
import { useState } from "react";

enum Step {
    ChooseMethod,
    EnterCode,
    NewPassword,
}

export function LostPassword() {
    const [step, setStep] = useState(Step.NewPassword);

    return (
        <>
            <svg className="absolute right-0 top-0 -z-10" width="267" height="137" viewBox="0 0 267 137" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M403.384 -57.627C529.789 42.2834 306.223 140.539 195.041 136.656C83.8589 132.773 -3.12461 39.4951 0.757951 -71.687C4.64051 -182.869 97.9189 -269.853 209.101 -265.97C320.283 -262.087 276.979 -157.537 403.384 -57.627Z" fill="#D9D9D9" />
            </svg>
            <svg className="absolute right-0 top-0 -z-20" width="329" height="189" viewBox="0 0 329 189" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M62.5596 86.4108C-92.0679 41.1275 78.4115 -133.722 182.952 -171.772C287.493 -209.822 403.085 -155.92 441.135 -51.3793C479.185 53.1613 407.107 134.954 314.575 177.251C222.042 219.547 217.187 131.694 62.5596 86.4108Z" fill="#F2F5FE" />
            </svg>

            <div className="px-5 pt-20 flex flex-col items-center w-full">
                <img src="https://randomuser.me/api/portraits/women/43.jpg" className="rounded-full shadow-md shadow-gray-600 w-24 h-24" />
            </div>

            {step === Step.ChooseMethod && <ChooseMethod setStep={setStep} />}
            {step === Step.EnterCode && <EnterCode setStep={setStep} />}
            {step === Step.NewPassword && <NewPassword setPassword={(password) => { console.log(password) }} />}
        </>
    );
}

function ChooseMethod({ setStep }: { setStep: (step: Step) => void }) {
    // enum RecoveryOption {
    //     SMS = 0,
    //     EMAIL = 1,
    // }

    // const [selectedOption, setSelectedOption] = useState(RecoveryOption.SMS);

    return (
        <>
            <div className="px-5 pt-3 flex flex-col items-center w-full">
                <h1 className="text-center font-bold text-xl my-3">Retrouver mon mot de passe</h1>
                <h3 className="text-center text-md px-10">Comment est-ce que tu veux réinitialiser ton mot de passe ?</h3>
                <fieldset className="w-4/5">
                    <div>
                        <div className="relative flex justify-between py-2 px-4 my-3 mx-10 rounded-full bg-gray-300">
                            <div className="ml-3 h-6 items-center invisible">
                            </div>
                            <div className="min-w-0 text-sm leading-6">
                                <label htmlFor="method-sms" className="select-none font-bold text-gray-900">SMS</label>
                            </div>
                            <div className="ml-3 h-6 items-center">
                                <input id="method-sms" name="plan" type="radio" checked className="h-4 w-4 border-gray-300 text-black focus:ring-gray-600" />
                            </div>
                        </div>
                        <div className="relative flex justify-between py-2 px-4 my-3 mx-10 rounded-full bg-gray-300">
                            <div className="ml-3 h-6 items-center invisible">
                            </div>
                            <div className="min-w-0 text-sm leading-6">
                                <label htmlFor="method-email" className="select-none font-bold text-gray-900">Email</label>
                            </div>
                            <div className="ml-3 h-6 items-center">
                                <input id="method-email" name="plan" type="radio" className="h-4 w-4 border-gray-300 text-black focus:ring-gray-600" />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

            <div className="absolute mb-24 bottom-0 left-0 right-0 flex flex-col items-center">
                <ButtonPrimary onClick={() => { setStep(Step.EnterCode) }} className="bg-black">Etape Suivante</ButtonPrimary>
                <a href="#"><p className="text-gray-800 font-normal mt-4">Annuler</p></a>
            </div>
        </>
    );
}

function EnterCode({ setStep }: { setStep: (step: Step) => void }) {
    return (
        <>
            <div className="px-5 pt-3 flex flex-col items-center w-full">
                <h1 className="text-center font-bold text-xl my-3">Retrouver mon mot de passe</h1>
                <h3 className="text-center text-md px-10">Entre la clé à 4 chiffres envoyé à ton numéro de téléphone</h3>
                <h2 className="text-center font-bold text-md my-5 px-10">+33 6 5* ** ** 78</h2>
                <SecretCode digitCount={4} onCodeEntered={console.log} />
            </div>

            <div className="absolute mb-2 bottom-0 left-0 right-0 flex flex-col items-center">
                <ButtonPrimary onClick={() => { setStep(Step.NewPassword) }} className="bg-black">Etape Suivante</ButtonPrimary>
                <a href="#"><p className="text-gray-800 font-normal mt-4">Annuler</p></a>
            </div>
        </>
    );
}

function NewPassword({ setPassword }: { setPassword: (password: string) => void }) {
    // const [passwordError, setPasswordError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="px-5 pt-3 flex flex-col items-center w-full">
                <h1 className="text-center font-bold text-xl my-3">Nouveau mot de passe</h1>
                <h3 className="text-center text-md px-10">Enregistre un nouveau mot de passe pour ton compte</h3>
            </div>
            <div className="pt-4 flex flex-col items-center w-full mx-auto px-8">
                <Input name="Password" setValue={setPassword} error={""} type={showPassword ? "text" : "password"}>
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
                <Input name="Password" setValue={setPassword} error={""} type={showPassword ? "text" : "password"}>
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
            </div>

            <div className="absolute mb-2 bottom-0 left-0 right-0 flex flex-col items-center">
                <ButtonPrimary onClick={() => { }} className="bg-black">Enregistrer</ButtonPrimary>
                <a href="#"><p className="text-gray-800 font-normal mt-4">Annuler</p></a>
            </div>
        </>
    );
}
