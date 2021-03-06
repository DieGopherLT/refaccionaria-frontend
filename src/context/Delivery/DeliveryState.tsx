import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import DeliveryContext from './DeliveryContext';
import DeliveryReducer, { DeliveryReducerState } from './DeliveryReducer';

import { DeliveryDTO, DeliveryGetResponse, GenericResponse } from '../../types/Api';

const DeliveryState: FC = ({ children }) => {

    const initialState: DeliveryReducerState = {
        deliveries: [],
        shouldFetchDeliveries: true,
    }

    const [state, dispatch] = useReducer(DeliveryReducer, initialState);

    useEffect(() => {
        if (state.shouldFetchDeliveries) {
            AxiosClient.get<DeliveryGetResponse>('/delivery')
                .then(response => dispatch({ type: 'SET_DELIVERIES', payload: response.data.deliveries }))
        }
    }, [state.shouldFetchDeliveries]);

    const fetchDeliveries = () => dispatch({ type: 'FETCH_DELIVERIES' });

    const postDelivery = async (delivery: DeliveryDTO) => {
        try {
            const response = await AxiosClient.post<GenericResponse>('/delivery', delivery, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    const deleteDelivery = async (productId: number, providerId: number) => {
        try {
            const response = await AxiosClient.delete(`/delivery?productId=${productId}&providerId=${providerId}`);
            dispatch({ type: 'DELETE_DELIVERY', payload: { productId, providerId } });
            return response.data;
        } catch(e: any) {
            return e.response.data;
        }
    }

    return (
        <DeliveryContext.Provider
            value={{
                deliveries: state.deliveries,
                fetchDeliveries,
                postDelivery,
                deleteDelivery
            }}
        >
            { children }
        </DeliveryContext.Provider>
    );
};

export default DeliveryState;
