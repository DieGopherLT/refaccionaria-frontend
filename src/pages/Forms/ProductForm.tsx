import React, { FC, useEffect, useContext, useMemo, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import ProductContext from '../../context/Product/ProductContext';
import ProviderContext from '../../context/Provider/ProviderContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';

import { Option } from '../../types/Form';
import { ProductDTO } from '../../types/Api';

const ProductForm: FC<RouteComponentProps> = props => {

    const {
        editingProduct, brands, categories, fetchProducts, postProduct, setEditingProduct, updateProduct
    } = useContext(ProductContext);
    const { providers } = useContext(ProviderContext);

    const { formData, handleChange } = useForm<ProductDTO>({
        name: editingProduct?.name || '',
        brand: editingProduct?.brand || '',
        price: editingProduct?.price || 0,
        amount: editingProduct?.amount || 0,
        description: editingProduct?.description || '',
        category_id: editingProduct?.category.category_id || 0,
        provider_id: editingProduct?.provider.provider_id || 0,
    });

    useEffect(() => {
        return () => {
            if (editingProduct !== null)
                setEditingProduct(null);
        };
    }, []);


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formData.price = parseFloat(formData.price.toString());
        formData.amount = parseInt(formData.amount.toString());
        formData.category_id = parseInt(formData.category_id.toString());
        formData.provider_id = parseInt(formData.provider_id.toString());

        if (editingProduct === null) {
            postProduct(formData)
                .then(() => {
                    fetchProducts();
                    props.history.push('/productos');
                });
        } else {
            updateProduct(editingProduct, formData)
                .then(() => {
                    fetchProducts();
                    props.history.push('/productos');
                });
        }
    }

    const brandOptions: Option[] = brands.map(brand => {
        const opt: Option = {
            value: brand,
            label: brand,
        };
        return opt;
    });

    const providerOptions: Option[] = providers.filter(({ enterprise }) => enterprise.toLowerCase() === formData.brand.toLowerCase())
        .map(provider => {
            let opt: Option = { value: provider.provider_id, label: provider.name };
            return opt;
        });

    const categoryOptions: Option[] = useMemo(() => {
        return categories.map(category => {
            let opt: Option = { value: category.category_id, label: category.name };
            return opt;
        });
    }, []);

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit }>
                    <h2 className="text-center text-2xl font-bold">
                        { editingProduct ? 'Modificar' : 'Nuevo Producto' }
                    </h2>
                    <Input
                        type="text"
                        label="Nombre"
                        id="name"
                        placeholder="Nombre del producto"
                        value={ formData.name }
                        onChange={ event => handleChange(event, 'name') }
                    />
                    <Select
                        label="Categoria"
                        options={ categoryOptions }
                        value={ formData.category_id }
                        onChange={ event => handleChange(event, 'category_id') }
                    />
                    <div className="flex flex-col justify-between md:flex-row">
                        <Select
                            label="Marca"
                            options={ brandOptions }
                            value={ formData.brand }
                            onChange={ event => handleChange(event, 'brand') }
                        />
                        <Select
                            label="Proveedor"
                            options={ providerOptions }
                            value={ formData.provider_id }
                            onChange={ event => handleChange(event, 'provider_id') }
                        />
                    </div>
                    <Input
                        type="number"
                        label="Precio"
                        id="price"
                        placeholder="Precio del producto"
                        value={ formData.price.toString() }
                        onChange={ event => handleChange(event, 'price') }
                    />
                    <Input
                        type="number"
                        label="Cantidad"
                        id="amount"
                        placeholder="Cantidad inicial del producto, por defecto es cero"
                        value={ formData.amount.toString() }
                        onChange={ event => handleChange(event, 'amount') }
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
                            text={ editingProduct ? 'Guardar cambios' : 'Agregar producto' }
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ProductForm;
