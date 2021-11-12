import { GenericResponse, Provider } from '../../types/Api';

export type ProviderReducerState = {
    providers: Provider[];
    shouldFetchProvider?: boolean;
    providerResponse: GenericResponse | null;
    editingProvider: Provider | null;
}

type ProviderAction =
    | { type: 'SET_PROVIDERS', payload: Provider[] }
    | { type: 'FETCH_PROVIDERS' }
    | { type: 'POST_PROVIDER', payload: GenericResponse }
    | { type: 'SET_EDITING_PROVIDER', payload: Provider | null }
    | { type: 'UPDATE_PROVIDER', payload: { provider: Provider, response: GenericResponse } }
    | { type: 'DELETE_PROVIDER', payload: { id: number, response: GenericResponse } }

export default function reducer(state: ProviderReducerState, action: ProviderAction): ProviderReducerState {
    switch(action.type) {
        case 'FETCH_PROVIDERS':
            return {
                ...state,
                shouldFetchProvider: true,
            }
        case 'SET_PROVIDERS':
            return {
                ...state,
                providers: action.payload,
                shouldFetchProvider: false
            }
        case 'POST_PROVIDER':
            return {
                ...state,
                providerResponse: action.payload
            }
        case 'SET_EDITING_PROVIDER':
            return {
                ...state,
                editingProvider: action.payload
            }
        case 'UPDATE_PROVIDER':
            const { response, provider } = action.payload
            return {
                ...state,
                providers: state.providers.map(p => {
                    return p.provider_id === provider.provider_id ? action.payload.provider : p;
                }),
                providerResponse: response
            }
        case 'DELETE_PROVIDER':
            return {
                ...state,
                providers: state.providers.filter(provider => provider.provider_id !== action.payload.id),
                providerResponse: action.payload.response
            }
        default:
            return {
                ...state
            }
    }
}
