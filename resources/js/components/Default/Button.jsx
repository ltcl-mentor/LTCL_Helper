import React from 'react';

const Button = ({ type = 'submit', className = '', processing, children }) => {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-purple border border-transparent text-sm rounded-md font-bold text-white uppercase tracking-widest active:bg-purple transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}

export default Button;
