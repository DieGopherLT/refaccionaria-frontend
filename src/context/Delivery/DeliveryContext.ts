import { createContext } from 'react';
import { DeliveryReducerState } from './DeliveryReducer';

interface DeliveryContextProps extends DeliveryReducerState{}

const DeliveryContext = createContext<DeliveryContextProps>({} as DeliveryContextProps);

export default DeliveryContext;
