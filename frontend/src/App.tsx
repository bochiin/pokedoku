import './App.css';
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core';
import { Navbar } from './components/Navbar';
import { DataDisplayPokedoku } from './components/DataDisplayPokedoku';

function App() {
    return (
        <MantineProvider>
            <Navbar/>
            <DataDisplayPokedoku/>
        </MantineProvider>
    )
}

export default App
