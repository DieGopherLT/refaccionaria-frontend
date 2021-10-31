import React, { useState } from 'react';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';

const ProductForm = () => {

    const [name, setName] = useState('');
    const [provider, setProvider] = useState('');

    const options: string[] = [
        'Asus',
        'Gigabyte',
        'Zotac'
    ];

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Form submitted' + name);
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
                        value={ name }
                        onChange={ event => setName(event.target.value) }
                    />
                    <Select
                        options={ options }
                        label="Proveedor"
                        value={ provider }
                        onChange={ event => setProvider(event.target.value) }
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
