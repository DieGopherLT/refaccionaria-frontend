import React, { FC, useEffect, useContext, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import ClientContext from '../../context/Client/ClientContext';

import useForm from '../../hooks/useForm';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button';
import GoBack from '../../components/UI/GoBack';

import { ClientDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';

const ClientForm: FC<RouteComponentProps> = props => {

    const { editingClient, fetchClients, postClient, setEditingClient, updateClient } = useContext(ClientContext);

    const { formData, handleChange } = useForm<ClientDTO>({
        name: editingClient?.name || '',
        address: editingClient?.address || '',
        phone: editingClient?.phone || ''
    });

    useEffect(() => {
        return () => {
            if (editingClient !== null)
                setEditingClient(null);
        }
    }, []);


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingClient === null) {
            postClient(formData)
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return;
                    }
                    fetchClients();
                    toast.success(message, options);
                });
        }
        else {
            updateClient({ ...formData, client_id: editingClient.client_id })
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return;
                    }
                    toast.success(message, options);
                })
        }
        props.history.push('/clientes');
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <GoBack to="/clientes" />
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-2xl font-bold text-center">
                        { editingClient ? 'Modificar cliente' : 'Nuevo cliente' }
                    </h2>
                    <Input
                        type="text"
                        label="Nombre"
                        placeholder="Nombre del cliente"
                        id="name"
                        value={ formData.name }
                        onChange={ event => handleChange(event, 'name') }
                    />
                    <Input
                        type="text"
                        label="Teléfono"
                        placeholder="Teléfono del cliente"
                        id="name"
                        value={ formData.phone }
                        onChange={ event => handleChange(event, 'phone') }
                    />
                    <Input
                        type="text"
                        label="Dirección"
                        placeholder="Dirección del cliente"
                        id="name"
                        value={ formData.address }
                        onChange={ event => handleChange(event, 'address') }
                    />
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            className="md:w-44"
                            color="blue"
                            type="submit"
                            text={ editingClient ? 'Guardar cambios' : 'Agregar cliente' }
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ClientForm;
