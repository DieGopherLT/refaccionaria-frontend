import React, { FC } from 'react';

interface WrapperProps {
    className?: string;
}

const Wrapper: FC<WrapperProps> = ({ children, className }) => {
    const classes = `mx-auto w-11/12 lg:w-full ${className ? className : ''}`;
    return (
        <div className={ classes }>
            { children }
        </div>
    );
};

export default Wrapper;
