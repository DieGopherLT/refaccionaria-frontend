import React, { FC } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';

const Clients: FC<RouteComponentProps> = props => {
    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5 flex justify-between md:justify-start gap-2">
                <Link
                    to="/clientes/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-48"
                >Agregar nuevo cliente</Link>
            </Wrapper>
            <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap md:whitespace-normal">
                <table className="w-full border-collapse lg:table-fixed ">
                    <thead>
                        <tr>
                            <th className="p-1 border border-blue-600 lg:w-8">ID</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Nombre</th>
                            <th className="p-1 border border-blue-600 lg:w-16">Dirección</th>
                            <th className="p-1 border border-blue-600 lg:w-14">Teléfono</th>
                            <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
            </Wrapper>
        </PageContainer>
    );
};

export default Clients;
