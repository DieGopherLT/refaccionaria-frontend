import React, { useState, useEffect, useContext } from 'react';

import SaleContext from '../context/Sales/SaleContext';
import ProductContext from '../context/Product/ProductContext';

import PageContainer from '../components/UI/PageContainer';
import Wrapper from '../components/UI/Wrapper';
import GoBack from '../components/UI/GoBack';

const SaleSummary = () => {

    const [bestSellingCategory, setBestSellingCategory] = useState<string>();
    const [totalGeneratedBySales, setTotalGeneratedBySales] = useState<number>();

    const { sales } = useContext(SaleContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (products.length > 0 && sales.length > 0) {
            const dictionary: Record<string, number> = {}

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
                <GoBack to="/" />
                <h1 className="text-3xl font-bold text-center">Estadísticas</h1>
                <div className="flex flex-col mt-5">
                    <div className="grid grid-cols-2 p-2 border border-black justify-items-center">
                        <p>Total de ingresos generados</p>
                        <p>{ totalGeneratedBySales }</p>
                    </div>
                    <div className="grid grid-cols-2 p-2 border border-black justify-items-center">
                        <p>Categoría más vendida</p>
                        <p>{ bestSellingCategory  || 'Desconocido' }</p>
                    </div>
                </div>
            </Wrapper>
        </PageContainer>
    );
};

export default SaleSummary;
