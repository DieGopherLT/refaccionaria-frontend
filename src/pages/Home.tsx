import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageContainer from '../components/UI/PageContainer';
import Table from '../components/Table/Table';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {

    useEffect(() => {
        console.log('Entering on home page');
        return () => {
            console.log('Leaving home page')
        }
    }, []);


    return (
        <PageContainer>
            <Table data={ [] }>
                <th className="p-1 border border-blue-600 lg:w-9">ID</th>
                <th className="p-1 border border-blue-600 lg:w-12">Nombre</th>
                <th className="p-1 border border-blue-600 lg:w-32">Descripcion</th>
                <th className="p-1 border border-blue-600 lg:w-8">Precio</th>
                <th className="p-1 border border-blue-600 lg:w-8">Cantidad</th>
                <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
            </Table>
        </PageContainer>
    );
};

export default Home;
