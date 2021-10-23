import React, { FC } from 'react';

import Button from '../UI/Button';

interface RowProps {
    data: any;
}

const Row: FC<RowProps> = ({ data }) => {

    return (
        <tr>
            { Object.values(data).map((value: any) => (
                <td className="p-1 border border-blue-600">{ value }</td>
            )) }
            <td className="p-1 border border-blue-600">
                <div className="flex justify-around gap-2 lg:gap-0">
                    <Button color='yellow' text='Editar'/>
                    <Button color='red' text='Borrar' />
                </div>
            </td>
        </tr>
    );
};

export default Row;
