import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ClientContext from './ClientContext';
import ClientReducer, { ClientReducerState } from './ClientReducer';

import { Client, ClientDTO, ClientGetResponse, GenericResponse } from '../../types/Api';

const ClientState: FC = ({ children }) => {

    const initialState: ClientReducerState = {
        clients: [],
        shouldFetchClients: true,
        editingClient: null
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

    const setEditingClient = (data: Client | null) => dispatch({ type: 'SET_EDITING_CLIENT', payload: data });

    const updateClient = async (data: Client) => {
        try {
            const response = await AxiosClient.put<GenericResponse>(`/client/${data.client_id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'UPDATE_CLIENT', payload: data });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const deleteClient = async (clientId: number) => {
        try {
            const response = await AxiosClient.delete<GenericResponse>(`/client/${clientId}`);
            dispatch({ type: 'DELETE_CLIENT', payload: clientId });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    return (
        <ClientContext.Provider
            value={{
                clients: state.clients,
                editingClient: state.editingClient,
                fetchClients,
                postClient,
                setEditingClient,
                updateClient,
                deleteClient
            }}
        >
            { children }
        </ClientContext.Provider>
    );
};

export default ClientState;
