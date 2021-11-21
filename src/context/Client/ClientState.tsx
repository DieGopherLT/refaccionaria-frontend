import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ClientContext from './ClientContext';
import ClientReducer, { ClientReducerState } from './ClientReducer';

import { ClientGetResponse } from '../../types/Api';

const ClientState: FC = ({ children }) => {

    const initialState: ClientReducerState = {
        clients: [],
        shouldFetchClients: true,
    }

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        if (state.shouldFetchClients) {
            AxiosClient.get<ClientGetResponse>('/client')
                .then(response => dispatch({ type: 'SET_CLIENTS', payload: response.data.clients }));
        }
    }, [state.shouldFetchClients]);


    const fetchClients = () => dispatch({ type: 'FETCH_CLIENTS' });

    return (
        <ClientContext.Provider
            value={{
                clients: state.clients,
                fetchClients
            }}
        >
            { children }
        </ClientContext.Provider>
    );
};

export default ClientState;
