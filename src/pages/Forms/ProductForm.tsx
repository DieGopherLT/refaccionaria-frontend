import React, { FC, useEffect, useContext, useMemo, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import useForm from '../../hooks/useForm';

import ProductContext from '../../context/Product/ProductContext';
import ProviderContext from '../../context/Provider/ProviderContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';
import GoBack from '../../components/UI/GoBack';

import { Option } from '../../types/Form';
import { ProductDTO } from '../../types/Api';
import { ToastAlertOptions as options } from '../../data/ToastAlert';

const ProductForm: FC<RouteComponentProps> = props => {

    const {
        editingProduct, brands, categories, fetchProducts, postProduct, setEditingProduct, updateProduct
    } = useContext(ProductContext);
    const { providers } = useContext(ProviderContext);

    const { formData, handleChange } = useForm<ProductDTO>({
        classification: editingProduct?.classification || '',
        brand: editingProduct?.brand || '',
        public_price: editingProduct?.public_price || 0,
        provider_price: editingProduct?.provider_price || 0,
        amount: editingProduct?.amount || 0,
        category_id: editingProduct?.category.category_id || 0,
        provider_id: editingProduct?.provider.provider_id || 0,
    });

    useEffect(() => {
        if (providers.length === 0) {
            Swal.fire('No hay proveedores', 'Agrega un proveedor primero antes de agregar un producto.', 'warning')
                .then(() => props.history.push('/productos'))
        }
    // eslint-disable-next-line
    }, []);


    useEffect(() => {
        return () => {
            if (editingProduct !== null)
                setEditingProduct(null);
        };
    // eslint-disable-next-line
    }, []);


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formData.public_price = parseFloat(formData.public_price.toString());
        formData.provider_price = parseFloat(formData.provider_price.toString());
        formData.amount = parseInt(formData.amount.toString());
        formData.category_id = parseInt(formData.category_id.toString());
        formData.provider_id = parseInt(formData.provider_id.toString())

        switch (true) {
            case Object.values(formData).some(field => field === ''):
                toast.error('Todos los campos son obligatorios', options);
                return;
            case isNaN(formData.provider_id):
                toast.warning('Agregue un proveedor', options);
                return;
            case isNaN(formData.category_id):
                toast.warning('Agregue una categoría', options);
                return;
            case formData.public_price === 0 || formData.public_price.toString() === '':
                toast.warning('Agregue un precio al público mayor a cero', options);
                return;
            case formData.provider_price === 0 || formData.provider_price.toString() === '':
                toast.warning('Agrege un precio de proveedor mayor a cero', options);
                return;
        }

        if (editingProduct === null) {
            postProduct(formData)
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return
                    }
                    toast.success(message, options);
                    fetchProducts();
                });
        } else {
            updateProduct(editingProduct, formData)
                .then(({ error, message }) => {
                    if (error) {
                        toast.error(message, options);
                        return
                    }
                    toast.success(message, options);
                    fetchProducts();
                });
        }
        props.history.push('/productos');
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
    }, [categories]);

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <GoBack to="/productos" />
                <Form onSubmit={ onSubmit }>
                    <h2 className="text-2xl font-bold text-center">
                        { editingProduct ? 'Modificar' : 'Nuevo Producto' }
                    </h2>
                    <Input
                        type="text"
                        label="Nombre"
                        id="name"
                        placeholder="Clasificación del producto"
                        value={ formData.classification }
                        onChange={ event => handleChange(event, 'classification') }
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
                        label="Precio al público"
                        id="price"
                        placeholder="Precio del producto"
                        value={ formData.public_price.toString() }
                        onChange={ event => handleChange(event, 'public_price') }
                    />
                    <Input
                        type="number"
                        label="Precio del proveedor"
                        id="price"
                        placeholder="Precio del producto"
                        value={ formData.provider_price.toString() }
                        onChange={ event => handleChange(event, 'provider_price') }
                    />
                    { editingProduct === null &&
                        <Input
                            type="number"
                            label="Cantidad"
                            id="amount"
                            placeholder="Cantidad inicial del producto, por defecto es cero"
                            value={ formData.amount.toString() }
                            onChange={ event => handleChange(event, 'amount') }
                        />
                    }
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
