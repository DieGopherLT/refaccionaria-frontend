import { createContext } from 'react';
import { DataReducerState } from './DataReducer';
import { ProviderDTO, Provider } from '../../types/Api';

interface DataContextProps extends DataReducerState {
    fetchProducts: () => Promise<void>;
    fetchProviders: () => Promise<void>;
    postProvider: (provider: ProviderDTO) => Promise<void>;
    setEditingProvider: (provider: Provider | null) => void;
    editProvider: (provider: Provider) => Promise<void>;
    deleteProvider: (id: number) => Promise<void>;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export default DataContext;
