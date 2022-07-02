import React, { useEffect, useRef } from 'react';

/**
 * 入力欄
 */
const input = ({ type = 'text', name, value, className, autoComplete, required, isFocused, handleChange }) => {
    const input = useRef();

    useEffect(() => {
        isFocused && input.current.focus();
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full`
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}

export default input;
