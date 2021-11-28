import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ClientContext from '../context/Client/ClientContext';

import PageContainer from '../components/UI/PageContainer';
import ActionsContainer from '../components/UI/ActionsContainer';
import Table from '../components/Table/Table';
import TableHeading from '../components/Table/TableHeading';
import TableHeadingColumn from '../components/Table/TableHeadingColumn';
import TableActions from '../components/Table/TableActions';
import TableDataCell from '../components/Table/TableDataCell';

import { Client } from '../types/Api';
import { ToastAlertOptions as options } from '../data/ToastAlert';

const Clients: FC<RouteComponentProps> = props => {

    const { clients, setEditingClient, deleteClient } = useContext(ClientContext);

    const editClientHandler = (client: Client) => {
        setEditingClient(client);
        props.history.push('/clientes/nuevo');
    }

    const deleteClientHandler = async (clientId: number) => {
        const confirmationAlert = await Swal.fire({
            title: 'Eliminar cliente',
            icon: 'question',
            text: '¿Estás seguro de que quieres eliminar este cliente?',
            confirmButtonText: 'Si, borrar',
            confirmButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'No, cancelar',
            cancelButtonColor: 'red',
        });

        if (confirmationAlert.value === confirmationAlert.isConfirmed) {
            const { error, message } = await deleteClient(clientId);
            if (error) {
                toast.error(message, options);
                return;
            }
            toast.success(message, options);
        }
    }

    return (
        <PageContainer>
            <ActionsContainer>
                <Link
                    to="/clientes/nuevo"
                    className="block w-full p-3 text-center text-white bg-green-500 rounded hover:bg-green-700 lg:w-48"
                >Agregar nuevo cliente</Link>
            </ActionsContainer>
            <Table>
                <TableHeading>
                    <TableHeadingColumn className="lg:w-8">ID</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Nombre</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-16">Dirección</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-14">Teléfono</TableHeadingColumn>
                    <TableHeadingColumn className="lg:w-20">Acciones</TableHeadingColumn>
                </TableHeading>
                <tbody>
                    {clients.map((client, index) => (
                        <tr key={`${client.client_id}${index}-${client.name}`}>
                            <TableDataCell> { client.client_id } </TableDataCell>
                            <TableDataCell> { client.name } </TableDataCell>
                            <TableDataCell> { client.address } </TableDataCell>
                            <TableDataCell> { client.phone } </TableDataCell>
                            <TableActions 
                                onEditClick={ () => editClientHandler(client) }
                                onDeleteClick={ () => deleteClientHandler(client.client_id) }
                            />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </PageContainer>
    );
};

export default Clients;
