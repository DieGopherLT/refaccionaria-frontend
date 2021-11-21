import { createContext } from 'react';
import { ClientReducerState } from './ClientReducer';
import { Client, ClientDTO, GenericResponse } from '../../types/Api';

interface ClientContextProps extends ClientReducerState {
    fetchClients: () => void;
    postClient: (client: ClientDTO) => Promise<GenericResponse>;
    setEditingClient: (data: Client | null) => void;
    updateClient: (data: Client) => Promise<GenericResponse>;
    deleteClient: (clientId: number) => Promise<GenericResponse>;
}

const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);

export default ClientContext;
