import React, { FC } from 'react';

import Button from '../UI/Button';

interface RowProps {
    data: any;
}

const Row: FC<RowProps> = ({ data }) => {

    return (
        <tr>
            { Object.values(data).map((value: any, index: number) => (
                <td key={ value + index } className="p-1 border border-blue-600">{ value }</td>
            )) }
            <td className="p-1 border border-blue-600">
                <div className="flex justify-around gap-2 lg:gap-0">
                    <div className="w-full md:w-28">
                        <Button color="yellow" type="button" text="Editar"/>
                    </div>
                    <div className="w-full md:w-28">
                        <Button color="red" type="button" text="Borrar"/>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default Row;
