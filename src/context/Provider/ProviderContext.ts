import { createContext } from 'react';
import { ProviderReducerState } from './ProviderReducer';
import { ProviderDTO, Provider } from '../../types/Api';

interface ProviderContextProps extends ProviderReducerState {
    fetchProviders: () => void;
    postProvider: (provider: ProviderDTO) => Promise<void>;
    setEditingProvider: (provider: Provider | null) => void;
    editProvider: (provider: Provider) => Promise<void>;
    deleteProvider: (id: number) => Promise<void>;
}

const ProviderContext = createContext<ProviderContextProps>({} as ProviderContextProps);

export default ProviderContext;
