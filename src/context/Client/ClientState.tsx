import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ClientContext from './ClientContext';
import ClientReducer, { ClientReducerState } from './ClientReducer';

import { ClientDTO, ClientGetResponse, GenericResponse } from '../../types/Api';

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

    const postClient = async (client: ClientDTO) => {
        try {
            const response = await AxiosClient.post<GenericResponse>('/client', client, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    return (
        <ClientContext.Provider
            value={{
                clients: state.clients,
                fetchClients,
                postClient
            }}
        >
            { children }
        </ClientContext.Provider>
    );
};

export default ClientState;
