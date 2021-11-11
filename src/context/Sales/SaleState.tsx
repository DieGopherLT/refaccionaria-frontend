import React, { FC, useReducer } from 'react';

import SaleContext from './SaleContext';
import SaleReducer, { SaleReducerState } from './SaleReducer';

const SaleState: FC = ({ children }) => {

    const initialState: SaleReducerState = {

    }

    const [state, dispatch] = useReducer(SaleReducer, initialState);

    return(
        <SaleContext.Provider
            value={{

            }}
        >
            { children }
        </SaleContext.Provider>
    );
}

export default SaleState;

