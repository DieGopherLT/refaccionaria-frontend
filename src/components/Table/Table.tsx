import React, { FC } from 'react';

import Wrapper from '../UI/Wrapper';

const Table: FC = ({ children }) => {
    return (
        <Wrapper className="max-w-5xl mt-5 overflow-x-auto 2xl:max-w-7xl whitespace-nowrap md:whitespace-normal">
            <table className="w-full border-collapse table-fixed lg:table-auto">
                { children }
            </table>
        </Wrapper>
    );
};

export default Table;