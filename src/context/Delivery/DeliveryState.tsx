import React, { FC, useEffect, useReducer } from 'react';
import AxiosClient from '../../config/axios';

import DeliveryContext from './DeliveryContext';
import DeliveryReducer, { DeliveryReducerState } from './DeliveryReducer';

import { DeliveryGetResponse } from '../../types/Api';

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

    return (
        <DeliveryContext.Provider
            value={{
                deliveries: state.deliveries
            }}
        >
            { children }
        </DeliveryContext.Provider>
    );
};

export default DeliveryState;
