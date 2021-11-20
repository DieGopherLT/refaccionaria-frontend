import { createContext } from 'react';
import { ClientReducerState } from './ClientReducer';

interface ClientContextProps extends ClientReducerState {}

const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);

export default ClientContext;
