import React, { FC } from 'react';

interface TableHeadingColumnProps {
    className: string;
}

const TableHeadingColumn: FC<TableHeadingColumnProps> = ({ className, children }) => {
    return (
        <th className={`p-1 border border-blue-600 ${className ? className : ''}`}>
            { children }
        </th>
    );
};

export default TableHeadingColumn;