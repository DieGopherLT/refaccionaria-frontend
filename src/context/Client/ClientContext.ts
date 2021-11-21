import { createContext } from 'react';
import { ClientReducerState } from './ClientReducer';
import { ClientDTO, GenericResponse } from '../../types/Api';

interface ClientContextProps extends ClientReducerState {
    fetchClients: () => void;
    postClient: (client: ClientDTO) => Promise<GenericResponse>;
    deleteClient: (clientId: number) => Promise<GenericResponse>;
}

const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);

export default ClientContext;
