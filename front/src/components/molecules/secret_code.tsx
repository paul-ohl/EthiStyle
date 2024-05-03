import { useState } from "react";

export function SecretCode(
    { digitCount, onCodeEntered }: { digitCount: number, onCodeEntered: (code: string) => void }
) {
    const [code, setCode] = useState<string>("");
    const [enteredDigitCount, setEnteredDigitCount] = useState<number>(0);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEnteredDigitCount(value.length);
        if (enteredDigitCount > digitCount) {
            return;
        }
        setCode(value);
        if (enteredDigitCount === digitCount) {
            if (value === "1234") {
                console.log("Code correct");
            } else {
                console.log("Code incorrect");
            }
            onCodeEntered(value);
        }
    };

    return (
        <div>
            <div onClick={() => { document.getElementById("code")?.focus() }} className="flex justify-center items-center">
                {[...Array(digitCount)].map((_, i) => (
                    <div key={i} className={"flex justify-center items-center w-4 h-4 mx-2 rounded-full " + (i >= enteredDigitCount ? "bg-blue-100" : "bg-blue-700")}>
                    </div>
                ))}
            </div>
            <input
                id="code"
                type="tel"
                className="opacity-0"
                value={code}
                onChange={handleCodeChange}
            />
        </div>
    );
}
