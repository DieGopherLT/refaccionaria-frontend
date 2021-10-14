import React from 'react';

import AppContainer from './components/UI/AppContainer';
import Wrapper from './components/UI/Wrapper';
import Navigation from './components/Navbar/Navigation';

import { navData } from './data/Navigation';

function App() {
    return (
        <AppContainer>
            <div className="h-20 bg-blue-900 md:h-full">
                <Wrapper className="h-full">
                    <Navigation data={ navData } />
                </Wrapper>
            </div>
            <div className="flex-grow">
                <h1 className="text-4xl text-red-500">Second part</h1>
            </div>
        </AppContainer>
    );
}

export default App;
