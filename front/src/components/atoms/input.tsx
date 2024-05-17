import React from 'react';

type InputProps = {
    setValue: (value: string) => void;
    name: string;
    error?: string;
    type?: string;
    children?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ setValue, name, error, type = 'text', children }) => {
    const baseClasses = "relative block w-full rounded-full border-0 mb-2.5 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6";
    const allGoodClasses = "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 ";
    const errorClasses = "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500";

    return (
        <div className="relative rounded-full w-full">
            <label htmlFor="email" className="absolute -top-2 left-4 inline-block bg-white px-1 text-xs font-medium text-red-600">{error}</label>
            <input
                type={type}
                className={
                    error === ""
                        ? baseClasses + allGoodClasses
                        : baseClasses + errorClasses
                }
                placeholder={name}
                aria-invalid="true"
                aria-describedby="email-error"
                onBlur={(e) => {
                    setValue(e.target.value);
                }}
            />
            {children}
        </div>
    );
};

export default Input;
