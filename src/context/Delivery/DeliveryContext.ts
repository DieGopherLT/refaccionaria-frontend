import { createContext } from 'react';
import { DeliveryReducerState } from './DeliveryReducer';
import { DeliveryDTO } from '../../types/Api';

interface DeliveryContextProps extends DeliveryReducerState{
    fetchDeliveries: () => void;
    postDelivery: (delivery: DeliveryDTO) => Promise<void>;
    deleteDelivery: (productId: number, providerId: number) => Promise<void>;
}

const DeliveryContext = createContext<DeliveryContextProps>({} as DeliveryContextProps);

export default DeliveryContext;
