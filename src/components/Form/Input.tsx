import React, { FC } from 'react';

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    label: string;
    id: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = props => {
    const { id, label, type, value, placeholder = '', onChange } = props;
    return (
        <div className="flex flex-col my-5 gap-2">
            <label htmlFor={ id }>{ label }</label>
            <input
                className="border border-black p-1 rounded"
                id={ id }
                type={ type }
                placeholder={ placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default Input;
