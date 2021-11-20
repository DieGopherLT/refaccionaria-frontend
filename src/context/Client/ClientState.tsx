import React, { FC, useReducer } from 'react';

import ClientContext from './ClientContext';
import ClientReducer, { ClientReducerState } from './ClientReducer';

const ClientState: FC = ({ children }) => {

    const initialState: ClientReducerState = {

    }

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    return (
        <ClientContext.Provider
            value={{

            }}
        >
            { children }
        </ClientContext.Provider>
    );
};

export default ClientState;
