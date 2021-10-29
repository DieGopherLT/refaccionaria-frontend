import React, { FC } from 'react';

const PageContainer: FC = props => (
    <div className="flex-row">
        { props.children }
    </div>
);

export default PageContainer;
