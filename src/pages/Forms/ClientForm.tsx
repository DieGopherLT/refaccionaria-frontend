import React, { FormEvent } from 'react';

import useForm from '../../hooks/useForm';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button';

import { ClientDTO } from '../../types/Api';

const ClientForm = () => {

    const { formData, handleChange } = useForm<ClientDTO>({
        name: '',
        address: '',
        phone: ''
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-center text-2xl font-bold">Nuevo cliente</h2>
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
                            text="Agregar cliente"
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ClientForm;
