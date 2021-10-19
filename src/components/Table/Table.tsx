import React, { FC, useState, useEffect, useRef, Fragment } from 'react';

interface TableProps {
    data: Object;
}

const Table: FC<TableProps> = ({ children, data }) => {
    
    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    }, []);

    const css = `grid grid-cols-${Object.keys(data).length}`;

    return (
        <Fragment>
            { width >= 1024 && 
                <div className={ css }>
                    { Object.keys(data).map(key => (
                        <p key={ key } className="text-center capitalize border border-blue-500">{ key }</p>
                    )) }
                </div> 
            }
            { children }
        </Fragment>
    );
};

export default Table;