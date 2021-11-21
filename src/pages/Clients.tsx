import React, { FC, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ClientContext from '../context/Client/ClientContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
import Button from '../components/UI/Button';

import { ToastAlertOptions as options } from '../data/ToastAlert';

const Clients: FC<RouteComponentProps> = props => {

    const { clients, deleteClient } = useContext(ClientContext);

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
                            <th className="p-1 border border-blue-600 lg:w-20">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { clients.map((client, index) => (
                            <tr key={ `${client.client_id}${index}-${client.name}` }>
                                <td className="p-1 border border-blue-600">{ client.client_id }</td>
                                <td className="p-1 border border-blue-600">{ client.name }</td>
                                <td className="p-1 border border-blue-600">{ client.address }</td>
                                <td className="p-1 border border-blue-600">{ client.phone }</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="yellow"
                                                type="button"
                                                text="Editar"
                                            />
                                        </div>
                                        <div className="w-full md:w-28">
                                            <Button
                                                color="red"
                                                type="button"
                                                text="Borrar"
                                                onClick={ () => deleteClientHandler(client.client_id) }
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

export default Clients;
