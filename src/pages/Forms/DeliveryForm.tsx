import React, { FC, useContext, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import useForm from '../../hooks/useForm';

import ProductContext from '../../context/Product/ProductContext';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';
import Select from '../../components/Form/Select';
import Button from '../../components/UI/Button';

import { Option } from '../../types/Form';

const DeliveryForm: FC<RouteComponentProps> = props => {

    const { products } = useContext(ProductContext);

    const { formData, handleChange } = useForm({
        productName: '',
        providerId: '',
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const productOptions: Option[] = products.map(product => {
        const opt: Option = { value: product.name, label: product.name };
        return opt;
    });

    const providerOptions: Option[] = products.filter(product => product.name.toLowerCase() === formData.productName.toLowerCase())
        .map(product => {
            const opt: Option = { value: product.provider.provider_id, label: product.provider.name };
            return opt;
        })

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-center text-2xl font-bold">Realizar nueva orden</h2>
                    <div className="flex flex-col md:flex-row justify-between">
                        <Select
                            label="Producto"
                            value={ formData.productName }
                            onChange={ event => handleChange(event, 'productName') }
                            options={ productOptions }
                        />
                        <Select
                            label="Proveedor"
                            value={ formData.providerId }
                            onChange={ event => handleChange(event, 'providerId') }
                            options={ providerOptions }
                        />
                    </div>
                    <div className="w-full md:flex md:justify-center">
                        <Button
                            className="md:w-44"
                            color="blue"
                            type="submit"
                            text="Registrar orden"
                        />
                    </div>
                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default DeliveryForm;
