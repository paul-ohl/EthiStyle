import { useState } from 'react';

export const RadioButtons = ({ options, onChange }: { options: string[], onChange: (value: string) => void }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className="grid-rows-4 mt-4">
            {options.map((option) => (
                <label
                    key={option}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedOption === option ? 'bg-gray-300' : 'bg-gray-100'
                        }`}
                >
                    <input
                        type="radio"
                        className="form-radio h-5 w-5 text-blue-600"
                        checked={selectedOption === option}
                        value={option}
                        onChange={handleChange}
                    />
                    <span className="text-gray-900">{option}</span>
                    {selectedOption === option && (
                        <svg
                            className="w-5 h-5 text-blue-600 ml-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </label>
            ))}
        </div>
    );
};

export default RadioButtons;
