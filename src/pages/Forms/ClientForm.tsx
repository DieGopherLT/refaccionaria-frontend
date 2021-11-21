import React, { FormEvent } from 'react';

import PageContainer from '../../components/UI/PageContainer';
import Wrapper from '../../components/UI/Wrapper';
import Form from '../../components/Form/Form';

const ClientForm = () => {

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <PageContainer>
            <Wrapper className="max-w-3xl mt-10">
                <Form onSubmit={ onSubmit } >
                    <h2 className="text-center text-2xl font-bold">Nuevo cliente</h2>

                </Form>
            </Wrapper>
        </PageContainer>
    );
};

export default ClientForm;
