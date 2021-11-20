import { createContext } from 'react';
import { DeliveryReducerState } from './DeliveryReducer';
import { DeliveryDTO, GenericResponse } from '../../types/Api';

interface DeliveryContextProps extends DeliveryReducerState{
    fetchDeliveries: () => void;
    postDelivery: (delivery: DeliveryDTO) => Promise<GenericResponse>;
    deleteDelivery: (productId: number, providerId: number) => Promise<GenericResponse>;
}

const DeliveryContext = createContext<DeliveryContextProps>({} as DeliveryContextProps);

export default DeliveryContext;
