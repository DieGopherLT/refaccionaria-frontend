import React, { FC } from 'react';

const PageContainer: FC = props => (
    <div className="flex-grow">
        { props.children }
    </div>
);

export default PageContainer;
