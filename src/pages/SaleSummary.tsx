import React, { useState, useEffect, useContext } from 'react';

import SaleContext from '../context/Sales/SaleContext';
import ProductContext from '../context/Product/ProductContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';

const SaleSummary = () => {

    const [bestSellingCategory, setBestSellingCategory] = useState<string>();
    const [totalGeneratedBySales, setTotalGeneratedBySales] = useState<number>();

    const { sales } = useContext(SaleContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (products.length > 0 && sales.length > 0) {
            const dictionary: {[key: string]: number} = {}

            products.forEach(product => {
                let salesTotalAmount = 0;
                const salesPerProduct = sales.filter(sale => sale.product.product_id === product.product_id)
                    .map(sale => sale.total)

                if (salesPerProduct.length > 0) {
                    salesTotalAmount = salesPerProduct.reduce((a, b) => a + b);
                }

                if (dictionary[product.category.name] in dictionary)
                    dictionary[product.category.name] += salesTotalAmount;
                else
                    dictionary[product.category.name] = salesTotalAmount;
            });

            const maxValue = Math.max(...Object.values(dictionary));
            const bestSellingCategory = Object.keys(dictionary).find(key => dictionary[key] === maxValue);
            setBestSellingCategory(bestSellingCategory);
        }
    }, [products, sales]);

    useEffect(() => {
        let total = 0;
        if (sales.length > 0) {
            total = sales.map(sale => sale.total).reduce((a, b) => a + b);
        }
        setTotalGeneratedBySales(total);
    }, [sales]);

    return (
        <PageContainer>
            <Wrapper className="max-w-5xl mt-5">
                <p>La categoria que tiene mas ventas es... { bestSellingCategory }</p>
                <p>El total de ingresos generados es... { totalGeneratedBySales }</p>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleSummary;
