import React, { FC } from 'react';

import Wrapper from '../UI/Wrapper';
import Row from './Row';

interface TableProps {
    data: any[];
}

// Note: Actions heading tends to have a w-28 class
const Table: FC<TableProps> = ({ children, data }) => {

    return (
        <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
            <table className="w-full border-collapse lg:table-fixed">
                <thead>
                    <tr>
                        { children }
                    </tr>
                </thead>
                <tbody>
                    { data.map((row, index) => (
                        <Row key={ index } data={ row } />
                    )) }
                </tbody>
            </table>
        </Wrapper>
    );
};

export default Table;
