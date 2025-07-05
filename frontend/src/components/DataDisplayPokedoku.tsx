import { Grid, Image, useMantineTheme } from '@mantine/core'
import './DataDisplayPokedoku.css'
import { useState } from 'react';
import { GetPokemon } from '../../wailsjs/go/main/App';

export function DataDisplayPokedoku() {

    const [sprite, setSprite] = useState('');

    async function getPokemon() {
        const pokemon = await GetPokemon("charmander")

        setSprite(pokemon.DefaultSprite)
    }

    return (
        <div className="game-body">
            <Grid className='game-grid' gutter='sm'>
                <Grid.Col onClick={getPokemon} className='grid-pokedoku' span={3}>
                    { sprite != '' 
                        ? 
                        <Image src={sprite}/> : 1
                    }
                </Grid.Col>

                <Grid.Col className='grid-pokedoku' span={3}>2</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>3</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>4</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>5</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>6</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>7</Grid.Col>
                <Grid.Col className='grid-pokedoku' span={3}>8</Grid.Col>
            </Grid>
        </div>
    )
}