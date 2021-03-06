import React, { FC, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import useForm from '../../hooks/useForm';

import ProductContext from '../../context/Product/ProductContext';
import ProviderContext from '../../context/Provider/ProviderContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button';
import GoBack from '../../components/UI/GoBack';

import { ProviderDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';

const ProviderForm: FC<RouteComponentProps> = props => {

    const {
        editingProvider, fetchProviders, postProvider, setEditingProvider, editProvider
    } = useContext(ProviderContext);
    const { fetchBrands } = useContext(ProductContext);

    const { formData, handleChange } = useForm<ProviderDTO>({
        name: editingProvider?.name || '',
        email: editingProvider?.email || '',
        phone: editingProvider?.phone || '',
        enterprise: editingProvider?.enterprise || '',
        address: editingProvider?.address || '',
    });

    useEffect(() => {
        return () => {
            if (editingProvider !== null)
                setEditingProvider(null);
        };
    // eslint-disable-next-line
    }, []);


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editingProvider === null) {
            postProvider(formData)
                .then(({ error, message }) => {
                    if(error) {
                        toast.error(message, options)
                        return;
                    }
                    props.history.push('/proveedores');
                    toast.success(message, options);
                })
        } else {
            editProvider({ ...formData, provider_id: editingProvider.provider_id })
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return;
                    }
                    setEditingProvider(null);
                    props.history.push('/proveedores');
                    toast.success(message, options);
                });
        }
        fetchProviders();
        fetchBrands();
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <GoBack to="/proveedores" />
                <Form onSubmit={ onSubmit }>
                    <h2 className="text-2xl font-bold text-center">
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
                        label="Tel??fono"
                        id="phone"
                        placeholder="Tel??fono del proveedor"
                        value={ formData.phone }
                        onChange={ event => handleChange(event, 'phone') }
                    />
                    <Input
                        type="text"
                        label="Direcci??n"
                        id="address"
                        placeholder="Direcci??n del proveedor"
                        value={ formData.address }
                        onChange={ event => handleChange(event, 'address') }
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
                            text={ editingProvider ? 'Guardar cambios' : 'Agregar proveedor' }
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ProviderForm;
