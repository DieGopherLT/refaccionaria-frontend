import React, { FC } from 'react';

import Button from '../UI/Button';

interface TableActionsProps {
    onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TableActions: FC<TableActionsProps> = ({ onEditClick, onDeleteClick }) => {
    return (
        <td className="p-1 border border-blue-600">
            <div className="flex justify-around gap-2 xl:gap-0">
                <div className="w-full md:w-28">
                    <Button
                        color="yellow"
                        type="button"
                        text="Editar"
                        onClick={ onEditClick }
                    />
                </div>
                <div className="w-full md:w-28">
                    <Button
                        color="red"
                        type="button"
                        text="Borrar"
                        onClick={ onDeleteClick }
                    />
                </div>
            </div>
        </td>
    );
};

export default TableActions;