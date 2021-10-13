import React, { FC } from 'react';

interface WrapperProps {}

const Wrapper: FC<WrapperProps> = ({ children }) => {
    return (
        <div className="mx-auto w-11/12 md:container w-full">
            { children }
        </div>
    );
};

export default Wrapper;
