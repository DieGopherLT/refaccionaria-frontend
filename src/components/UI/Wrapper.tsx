import React, { FC } from 'react';

interface WrapperProps {
    className?: string;
    fullWidth?: boolean;
}

const Wrapper: FC<WrapperProps> = ({ children, className, fullWidth = false }) => {
    const classes = `mx-auto ${fullWidth ? 'w-full' : 'w-11/12'} ${className ? className : ''}`;
    return (
        <div className={ classes }>
            { children }
        </div>
    );
};

export default Wrapper;
