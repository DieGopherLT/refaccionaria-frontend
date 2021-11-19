import React, { useState, useEffect, useContext } from 'react';

import SaleContext from '../context/Sales/SaleContext';
import ProductContext from '../context/Product/ProductContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';

const SaleSummary = () => {

    const [mostSoldCategory, setMostSoldCategory] = useState<string>();

    const { sales } = useContext(SaleContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (products.length > 0 && sales.length > 0) {
            const dictionary: {[key: string]: number} = {}

            products.forEach(product => {
                let saleTotalAmount = 0;
                const salesPerProduct = sales.filter(sale => sale.product.product_id === product.product_id)
                    .map(sale => sale.total)

                if (salesPerProduct.length > 0) {
                    saleTotalAmount = salesPerProduct.reduce((a, b) => a + b);
                }

                if (dictionary[product.category.name] in dictionary)
                    dictionary[product.category.name] += saleTotalAmount;
                else
                    dictionary[product.category.name] = saleTotalAmount;
            });

            const maxValue = Math.max(...Object.values(dictionary));
            const mostSoldCategory = Object.keys(dictionary).find(key => dictionary[key] === maxValue);
            setMostSoldCategory(mostSoldCategory);
        }
    }, [products, sales]);

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <p>La categoria que tiene mas ventas es... { mostSoldCategory }</p>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleSummary;
