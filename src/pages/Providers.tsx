import React, { FC, useEffect, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import ProviderContext from '../context/Provider/ProviderContext';

import Wrapper from '../components/UI/Wrapper';
import PageContainer from '../components/UI/PageContainer';
import Button from '../components/UI/Button';

import { Provider } from '../types/Api';

const Providers: FC<RouteComponentProps> = props => {

    const { providers, fetchProviders, setEditingProvider, deleteProvider } = useContext(ProviderContext);

    useEffect(() => {
        const fetching = async () => {
            await fetchProviders();
        }
        fetching();
    }, []);

    const editP = (provider: Provider) => {
        setEditingProvider(provider);
        props.history.push('/proveedores/nuevo');
    }

    const deleteP = async (id: number) => {
        await deleteProvider(id);
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <Link
                    to="/proveedores/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-52"
                >Agregar proveedor nuevo</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed">
                    <thead>
                        <tr>
                            <th className="p-1 border border-blue-600 lg:w-3">ID</th>
                            <th className="p-1 border border-blue-600 lg:w-16">Nombre</th>
                            <th className="p-1 border border-blue-600 lg:w-24">Correo</th>
                            <th className="p-1 border border-blue-600 lg:w-12">Teléfono</th>
                            <th className="p-1 border border-blue-600 lg:w-12">Empresa</th>
                            <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { providers.map((provider, index) => (
                            <tr key={ index + provider.provider_id }>
                                <td className="p-1 border border-blue-600">{ provider.provider_id }</td>
                                <td className="p-1 border border-blue-600">{ provider.name }</td>
                                <td className="p-1 border border-blue-600">{ provider.email }</td>
                                <td className="p-1 border border-blue-600">{ provider.phone }</td>
                                <td className="p-1 border border-blue-600">{ provider.enterprise }</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="yellow"
                                                type="button"
                                                text="Editar"
                                                onClick={ () => editP(provider) }
                                            />
                                        </div>
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="red"
                                                type="button"
                                                text="Borrar"
                                                onClick={ () => deleteP(provider.provider_id) }
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Wrapper>
        </PageContainer>
    );
};

export default Providers;
