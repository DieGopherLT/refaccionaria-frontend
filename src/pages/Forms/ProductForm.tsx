import React from 'react';

import useForm from '../../hooks/useForm';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Button from '../../components/UI/Button';

const ProductForm = () => {

    const { formData, handleChange } = useForm({
        name: '',
        price: 0,
        description: ''
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit }>
                    <h2 className="text-center text-2xl font-bold">Nuevo Producto</h2>
                    <Input
                        type="text"
                        label="Nombre"
                        id="name"
                        placeholder="Nombre del producto"
                        value={ formData.name }
                        onChange={ event => handleChange(event, 'name') }
                    />
                    <Input
                        type="number"
                        label="Precio"
                        id="price"
                        placeholder="Precio del producto"
                        value={ formData.price.toString() }
                        onChange={ event => handleChange(event, 'price') }
                    />
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Descripcion del producto"
                        className="w-full border border-black p-2 my-2"
                        value={ formData.description }
                        onChange={ event => handleChange(event, 'description') }
                    />
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            className="md:w-44"
                            color="blue"
                            type="submit"
                            text="Agregar producto"
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ProductForm;
