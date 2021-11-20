import { createContext } from 'react';
import { ProviderReducerState } from './ProviderReducer';
import { ProviderDTO, Provider, GenericResponse } from '../../types/Api';

interface ProviderContextProps extends ProviderReducerState {
    fetchProviders: () => void;
    postProvider: (provider: ProviderDTO) => Promise<GenericResponse>;
    setEditingProvider: (provider: Provider | null) => void;
    editProvider: (provider: Provider) => Promise<GenericResponse>;
    deleteProvider: (id: number) => Promise<GenericResponse>;
}

const ProviderContext = createContext<ProviderContextProps>({} as ProviderContextProps);

export default ProviderContext;
