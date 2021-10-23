import React from 'react';

import AppContainer from './components/UI/AppContainer';
import Wrapper from './components/UI/Wrapper';
import Navigation from './components/Navbar/Navigation';
import Button from './components/UI/Button';

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
                <Wrapper className="max-w-5xl mt-5 overflow-x-auto whitespace-nowrap lg:whitespace-normal">
                    <table className="w-full border-collapse lg:table-fixed">
                        <thead>
                            <tr>
                                <th className="p-1 border border-blue-600 lg:w-9">ID</th>
                                <th className="p-1 border border-blue-600 lg:w-12">Nombre</th>
                                <th className="p-1 border border-blue-600 lg:w-32">Descripcion</th>
                                <th className="p-1 border border-blue-600 lg:w-8">Precio</th>
                                <th className="p-1 border border-blue-600 lg:w-8">Cantidad</th>
                                <th className="p-1 border border-blue-600 lg:w-28">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 border border-blue-600">1</td>
                                <td className="p-1 border border-blue-600">Aceite</td>
                                <td className="p-1 border border-blue-600">Minim dolore nostrud occaecat non consequat fugiat.</td>
                                <td className="p-1 border border-blue-600">300</td>
                                <td className="p-1 border border-blue-600">12</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <Button color='yellow' text='Editar'/>
                                        <Button color='red' text='Borrar' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-blue-600">1</td>
                                <td className="p-1 border border-blue-600">Aceite</td>
                                <td className="p-1 border border-blue-600">Minim dolore nostrud occaecat non consequat fugiat.</td>
                                <td className="p-1 border border-blue-600">300</td>
                                <td className="p-1 border border-blue-600">12</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <Button color='yellow' text='Editar'/>
                                        <Button color='red' text='Borrar' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-blue-600">1</td>
                                <td className="p-1 border border-blue-600">Aceite</td>
                                <td className="p-1 border border-blue-600">Minim dolore nostrud occaecat non consequat fugiat.</td>
                                <td className="p-1 border border-blue-600">300</td>
                                <td className="p-1 border border-blue-600">12</td>
                                <td className="p-1 border border-blue-600">
                                    <div className="flex justify-around gap-2 lg:gap-0">
                                        <Button color='yellow' text='Editar'/>
                                        <Button color='red' text='Borrar' />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Wrapper>
            </div>
        </AppContainer>
    );
}

export default App;
