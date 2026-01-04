import './App.css';
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core';
import { Navbar } from './components/Navbar';
import { DataDisplayPokedoku } from './components/DataDisplayPokedoku';
import { Notifications } from '@mantine/notifications';

function App() {
    return (
        <MantineProvider>
            <Notifications/>
            <Navbar/>
            <DataDisplayPokedoku/>
        </MantineProvider>
    )
}

export default App
