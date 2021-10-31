import React, { FC } from 'react';

interface SelectProps {
    options: string[];
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({ options, label, value, onChange }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 my-5">
            <label htmlFor={ label }>{ label }</label>
            <select
                className="p-2 bg-white border-black border rounded"
                id={ label }
                value={ value }
                onChange={ onChange }
            >
                <option value="">--Selecciona una opción--</option>
                { options.map((option, index) => (
                    <option
                        key={ `${option}-${index}` }
                        value={ option }
                        className="capitalize"
                    >{ option }</option>
                )) }
            </select>
        </div>
    );
};

export default Select;
