import React, { FormEvent } from 'react';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';

const DeliveryForm = () => {

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >

                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default DeliveryForm;
