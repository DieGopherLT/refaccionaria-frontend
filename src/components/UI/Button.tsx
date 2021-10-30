import React, { FC, MouseEvent } from 'react';

type Color =
    | 'blue'
    | 'green'
    | 'red'
    | 'gray'
    | 'yellow'
    | 'indigo'
    | 'pink'
    | 'purple'

interface ButtonProps {
    color: Color;
    className?: string; // This props is meant to define the size of the button on different sizes via CSS.
    text: string;
    type: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ color, className, text, type, onClick }) => {
    const bg = `bg-${color}-500`;
    const bgHover = `hover:bg-${color}-700`;

    return (
        <button
            type={ type }
            onClick={ onClick }
            className={`py-2 px-4 rounded-md w-full text-white transition-colors duration-300 ${bg} ${bgHover} ${className}`}
        >
            { text }
        </button>
    );
};

export default Button;
