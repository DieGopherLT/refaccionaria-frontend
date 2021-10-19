import React, { FC } from 'react';

import Button from '../UI/Button';


interface RowProps {
    data: Object;
}

const Row: FC<RowProps> = ({ data }) => {
    
    const tableLenght = Object.keys(data).length;

    return (
        <div className="grid grid-cols-2 gap-2 mb-5">
            <div className={ `grid grid-rows-${tableLenght}` }>
                { Object.keys(data).map(key => (
                    <div key={ key } className="flex items-center justify-center border border-blue-500">
                        <p className="text-center capitalize">{ key }</p>
                    </div>
                )) }
            </div>
            <div className={ `grid grid-rows-${tableLenght}` }>
                { Object.values(data).map(value => (
                    <div key={ value } className="flex items-center justify-center border border-blue-500">
                        <p className="text-center">{ value }</p>
                    </div>
                )) }
            </div>

            <Button color="yellow" text="Editar"/>
            <Button color="red" text="Eliminar"/>
        </div>
    );
};

export default Row;