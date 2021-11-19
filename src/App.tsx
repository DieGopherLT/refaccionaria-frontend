import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppContainer from './components/UI/AppContainer';
import Home from './pages/Home';
import SaleForm from './pages/Forms/SaleForm';
import SaleSummary from './pages/SaleSummary';
import Products from './pages/Products';
import ProductForm from './pages/Forms/ProductForm';
import Providers from './pages/Providers';
import ProviderForm from './pages/Forms/ProviderForm';
import Deliveries from './pages/Deliveries';
import DeliveryForm from './pages/Forms/DeliveryForm';

import ProductState from './context/Product/ProductState';
import ProviderState from './context/Provider/ProviderState';
import SaleState from './context/Sales/SaleState';
import DeliveryState from './context/Delivery/DeliveryState';

import Wrapper from './components/UI/Wrapper';
import Navigation from './components/Navbar/Navigation';

import { navData } from './data/Navigation';

function App() {
    return (
        <Router>
            <DeliveryState>
                <SaleState>
                    <ProviderState>
                        <ProductState>
                            <AppContainer>
                                <div className="h-20 bg-blue-900 lg:h-full">
                                    <Wrapper className="h-full">
                                        <Navigation data={ navData }/>
                                    </Wrapper>
                                </div>

                                <Switch>
                                    <Route exact path="/" component={ Home }/>
                                    <Route exact path="/ventas/nuevo" component={ SaleForm }/>
                                    <Route exact path="/ventas/resumen" component={ SaleSummary }/>

                                    <Route exact path="/productos" component={ Products }/>
                                    <Route exact path="/productos/nuevo" component={ ProductForm }/>

                                    <Route exact path="/proveedores" component={ Providers }/>
                                    <Route exact path="/proveedores/nuevo" component={ ProviderForm }/>

                                    <Route exact path="/entregas" component={ Deliveries }/>
                                    <Route exact path="/entregas/nuevo" component={ DeliveryForm }/>
                                </Switch>
                            </AppContainer>
                        </ProductState>
                    </ProviderState>
                </SaleState>
            </DeliveryState>
        </Router>
    );
}

export default App;
