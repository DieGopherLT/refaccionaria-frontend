import React, { FC } from 'react';

interface AppContainerProps {}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:grid md:grid-cols-app h-screen">
            { children }
        </div>
    );
};

export default AppContainer;
