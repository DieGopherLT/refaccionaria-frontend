import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppContainer from './components/UI/AppContainer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductForm from './pages/Forms/ProductForm';
import Providers from './pages/Providers';
import ProviderForm from './pages/Forms/ProviderForm';
import Deliveries from './pages/Deliveries';

import ProductState from './context/Product/ProductState';
import ProviderState from './context/Provider/ProviderState';
import SaleState from './context/Sales/SaleState';

import Wrapper from './components/UI/Wrapper';
import Navigation from './components/Navbar/Navigation';

import { navData } from './data/Navigation';

function App() {
    return (
        <Router>
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

                                <Route exact path="/productos" component={ Products }/>
                                <Route exact path="/productos/nuevo" component={ ProductForm }/>

                                <Route exact path="/proveedores" component={ Providers }/>
                                <Route exact path="/proveedores/nuevo" component={ ProviderForm }/>

                                <Route exact path="/entregas" component={ Deliveries }/>
                                <Route exact path="/entregas/nuevo" component={ () => <h1>Form</h1> }/>
                            </Switch>
                        </AppContainer>
                    </ProductState>
                </ProviderState>
            </SaleState>
        </Router>
    );
}

export default App;
