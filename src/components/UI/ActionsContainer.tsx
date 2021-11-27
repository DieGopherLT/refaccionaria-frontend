import React, { FC } from 'react';

import Wrapper from './Wrapper';

const ActionsContainer: FC = ({ children }) => {
    return (
        <Wrapper className="flex justify-between max-w-5xl gap-2 mt-5 2xl:max-w-7xl md:justify-start">
            { children }
        </Wrapper>
    );
};

export default ActionsContainer;