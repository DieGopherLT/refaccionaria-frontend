import React, { FC, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProviderReducer, { ProviderReducerState } from './ProviderReducer';
import ProviderContext from './ProviderContext';
import { GenericResponse, Provider, ProviderDTO, ProviderGetResponse } from '../../types/Api';

const ProviderState: FC = ({ children }) => {

    const initialState: ProviderReducerState = {
        providers: [],
        editingProvider: null,
        providerResponse: null
    }

    const [state, dispatch] = useReducer(ProviderReducer, initialState);

    const fetchProviders = async () => {
        try {
            const info = await AxiosClient.get<ProviderGetResponse>('/provider');
            dispatch({ type: 'SET_PROVIDERS', payload: info.data.providers });
        } catch(e: any) {
            console.log(e.response);
        }
    }

    const postProvider = async (provider: ProviderDTO) => {
        try {
            const jsonInfo = JSON.stringify(provider);
            const info = await AxiosClient.post<GenericResponse>('/provider', jsonInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'POST_PROVIDER', payload: info.data });
        } catch(e) {
            console.log(e);
        }
    }

    const setEditingProvider = (payload: Provider | null) => {
        dispatch({ type: 'SET_EDITING_PROVIDER', payload });
    }

    const editProvider = async (provider: Provider) => {
        try {
            const jsonInfo = JSON.stringify(provider);
            const info = await AxiosClient.put<GenericResponse>(`/provider?id=${provider.provider_id}`, jsonInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'UPDATE_PROVIDER', payload: { provider, response: info.data } });
        } catch(e: any) {
            console.log(e.response);
        }
    }

    const deleteProvider = async (id: number) => {
        try {
            const info = await AxiosClient.delete<GenericResponse>(`/provider?id=${id}`);
            dispatch({ type: 'DELETE_PROVIDER', payload: { id, response: info.data } });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <ProviderContext.Provider
            value={{
                providers: state.providers,
                editingProvider: state.editingProvider,
                providerResponse: state.providerResponse,
                fetchProviders,
                postProvider,
                setEditingProvider,
                editProvider,
                deleteProvider
            }}
        >
            { children }
        </ProviderContext.Provider>
    );
};

export default ProviderState;