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
    color: Color
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

const Button: FC<ButtonProps> = ({ color, text, onClick }) => {
    const bg = `bg-${color}-500`;
    const bgHover = `hover:bg-${color}-700`;

    return (
        <button
            type="button"
            onClick={ onClick }
            className={`py-2 px-4 rounded-md w-full text-white transition-colors duration-300 md:w-28 ${bg} ${bgHover}`}
        >
            { text }
        </button>
    );
};

export default Button;
