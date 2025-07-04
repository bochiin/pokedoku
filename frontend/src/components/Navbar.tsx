import { Center, Flex, Image } from '@mantine/core'
import './Navbar.css'
import logo from '../assets/images/pokemon-logo-black-transparent.png'

export function Navbar() {

    return (
        <nav className="navbar">
            <div className='menu-logo'>
                <Image 
                    src={logo}
                    h={80}
                    w={150}/>
            </div>

            <ul>
                <li className='menu-item'>
                    Teste 1
                </li>
                <li className='menu-item'>
                    Teste 2
                </li>
            </ul>
        </nav>
    )
}