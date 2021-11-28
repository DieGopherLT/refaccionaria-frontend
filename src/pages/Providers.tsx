import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ProductContext from '../context/Product/ProductContext';
import ProviderContext from '../context/Provider/ProviderContext';

import PageContainer from '../components/UI/PageContainer';
import ActionsContainer from '../components/UI/ActionsContainer';
import Table from '../components/Table/Table';
import TableHeading from '../components/Table/TableHeading';
import TableHeadingColumn from '../components/Table/TableHeadingColumn';
import TableActions from '../components/Table/TableActions';
import TableDataCell from '../components/Table/TableDataCell';

import { Provider } from '../types/Api';
import { ToastAlertOptions as options } from '../data/ToastAlert';

const Providers: FC<RouteComponentProps> = props => {

    const { providers, setEditingProvider, deleteProvider } = useContext(ProviderContext);
    const { fetchBrands } = useContext(ProductContext);

    const editP = (provider: Provider) => {
        setEditingProvider(provider);
        props.history.push('/proveedores/nuevo');
    };

    const deleteP = async (id: number) => {
        const confirmationResult = await Swal.fire({
            title: 'Eliminar proveedor',
            icon: 'question',
            text: '¿Estás seguro de que quieres eliminar este proveedor?',
            confirmButtonText: 'Si, borrar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'No, cancelar',
            cancelButtonColor: 'red',
        });

        if(confirmationResult.value === confirmationResult.isConfirmed) {
            const response = await deleteProvider(id);
            if(response.error) {
                toast.error(response.message, options);
            }
            else {
                toast.success(response.message, options);
            }
            fetchBrands();
        }
    };

    return (
        <PageContainer>
            <ActionsContainer>
                <Link
                    to="/proveedores/nuevo"
                    className="text-white text-center bg-green-500 hover:bg-green-700 p-3 rounded block w-full lg:w-52"
                >Agregar proveedor nuevo</Link>
            </ActionsContainer>
            <Table>
                <TableHeading>
                    <TableHeadingColumn className="lg:w-3">ID</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-16">Nombre</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-20">Correo</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Teléfono</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-20">Dirección</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-12">Empresa</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-24">Acciones</TableHeadingColumn>
                </TableHeading>
                <tbody>
                { providers.map((provider, index) => (
                    <tr key={ index + provider.provider_id }>
                        <TableDataCell> { provider.provider_id } </TableDataCell>
                        <TableDataCell> { provider.name } </TableDataCell>
                        <TableDataCell> { provider.email } </TableDataCell>
                        <TableDataCell> { provider.phone } </TableDataCell>
                        <TableDataCell> { provider.address } </TableDataCell>
                        <TableDataCell> { provider.enterprise } </TableDataCell>
                        <TableActions
                            onEditClick={ () => editP(provider) }
                            onDeleteClick={ () => deleteP(provider.provider_id) }
                        />
                    </tr>
                )) }
                </tbody>
            </Table>
        </PageContainer>
    );
};

export default Providers;
