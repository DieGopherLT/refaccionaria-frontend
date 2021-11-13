import React, { FC, useReducer } from 'react';

import DeliveryContext from './DeliveryContext';
import DeliveryReducer, { DeliveryReducerState } from './DeliveryReducer';

const DeliveryState: FC = ({ children }) => {

    const initialState: DeliveryReducerState = {

    }

    const [state, dispatch] = useReducer(DeliveryReducer, initialState);

    return (
        <DeliveryContext.Provider
            value={{
                
            }}
        >
            { children }
        </DeliveryContext.Provider>
    );
};

export default DeliveryState;
