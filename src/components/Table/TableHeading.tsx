import React, { FC } from 'react';

const TableHeading: FC = ({ children }) => {
    return (
        <thead>
            <tr>
                { children }
            </tr>
        </thead>
    );
};

export default TableHeading;