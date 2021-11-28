import React, { FC } from 'react';

const TableDataCell: FC = ({ children }) => {
    return (
        <td className="p-1 border border-blue-600">
            { children }
        </td>
    );
};

export default TableDataCell;