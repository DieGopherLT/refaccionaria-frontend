import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import ProviderReducer, { ProviderReducerState } from './ProviderReducer';
import ProviderContext from './ProviderContext';
import { GenericResponse, Provider, ProviderDTO, ProviderGetResponse } from '../../types/Api';

const ProviderState: FC = ({ children }) => {

    const initialState: ProviderReducerState = {
        providers: [],
        shouldFetchProvider: true,
        editingProvider: null,
        providerResponse: null
    }

    const [state, dispatch] = useReducer(ProviderReducer, initialState);

    useEffect(() => {
        AxiosClient.get<ProviderGetResponse>('/provider')
            .then(result => dispatch({ type: 'SET_PROVIDERS', payload: result.data.providers }))
    }, [state.shouldFetchProvider])

    const fetchProviders =  () => dispatch({ type: 'FETCH_PROVIDERS' });

    const postProvider = async (provider: ProviderDTO) => {
        try {
            const jsonInfo = JSON.stringify(provider);
            const info = await AxiosClient.post<GenericResponse>('/provider', jsonInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'POST_PROVIDER', payload: info.data });
            return info.data;
        } catch(e: any) {
            return e.response.data;
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
            return info.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const deleteProvider = async (id: number) => {
        try {
            const info = await AxiosClient.delete<GenericResponse>(`/provider?id=${id}`);
            dispatch({ type: 'DELETE_PROVIDER', payload: { id, response: info.data } });
            return info.data;
        } catch(e: any) {
            return e.response.data;
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
