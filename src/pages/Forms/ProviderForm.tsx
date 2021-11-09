import React, { FC, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import ProviderContext from '../../context/Provider/ProviderContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button';

import { ProviderDTO } from '../../types/Api';

const ProviderForm: FC<RouteComponentProps> = props => {

    const {
        editingProvider, postProvider, setEditingProvider, editProvider
    } = useContext(ProviderContext);

    const { formData, handleChange } = useForm<ProviderDTO>({
        name: editingProvider?.name || '',
        email: editingProvider?.email || '',
        phone: editingProvider?.phone || '',
        enterprise: editingProvider?.enterprise || '',
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editingProvider === null) {
            postProvider(formData)
                .then(() => props.history.push('/proveedores'));
        } else {
            editProvider({ ...formData, provider_id: editingProvider.provider_id })
                .then(() => {
                    setEditingProvider(null);
                    props.history.push('/proveedores');
                })
        }
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit }>
                    <h2 className="text-center text-2xl font-bold">
                        { editingProvider ? 'Modificar proveedor' : 'Nuevo Proveedor' }
                    </h2>
                    <Input
                        type="text"
                        label="Nombre"
                        id="name"
                        placeholder="Nombre del proveedor"
                        value={ formData.name }
                        onChange={ event => handleChange(event, 'name') }
                    />
                    <Input
                        type="text"
                        label="Correo"
                        id="email"
                        placeholder="Correo del proveedor"
                        value={ formData.email }
                        onChange={ event => handleChange(event, 'email') }
                    />
                    <Input
                        type="text"
                        label="Teléfono"
                        id="phone"
                        placeholder="Teléfono del proveedor"
                        value={ formData.phone }
                        onChange={ event => handleChange(event, 'phone') }
                    />
                    <Input
                        type="text"
                        label="Empresa"
                        id="enterprise"
                        placeholder="Empresa del proveedor"
                        value={ formData.enterprise }
                        onChange={ event => handleChange(event, 'enterprise') }
                    />
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            className="md:w-44"
                            color="blue"
                            type="submit"
                            text={ editingProvider ? 'Guardar cambios' : 'Agregar producto' }
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ProviderForm;
