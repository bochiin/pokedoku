import { Grid, Image, useMantineTheme } from '@mantine/core'
import './DataDisplayPokedoku.css'
import { useEffect, useMemo, useState } from 'react';
import { GetPokemon, GetRandomThemes } from '../../wailsjs/go/main/App';
import { pokeapi, themes } from '../../wailsjs/go/models';


export function DataDisplayPokedoku() {

    const maxLines = 4;
    const maxCols = 4;

    const [answers, setAnwsers] = useState(initGameMatrix());
    const [gameThemes, setGameThemes] = useState<Map<string, themes.Theme>>(new Map())

    useEffect(() => {
        const fetchGameData = async () => {
            let themes = await GetRandomThemes()

            let col = 1;
            let line = 0;

            const newMap = new Map()

            for(let theme of  themes) {

                newMap.set(JSON.stringify({line, col}), theme)

                if(col == 3) {
                    col = 0
                    line = 0
                }

                col == 0 ? line++ : col++ 
            }    

            setGameThemes(newMap)
        }

        fetchGameData()
        
    }, []);



    async function getPokemon(line: number, col: number) {        
        const pokemon = await GetPokemon("charmander")

        const copy = [...answers]

        copy[line][col] = pokemon

        setAnwsers(copy)
    }

    function getAllCols(line: number) {
        let cols = []

        for(let i = 0; i < maxCols; i++) {
            cols.push(getCol(line, i))
        }

        return cols
    }

    function initGameMatrix() {
        let matriz: Array<Array<pokeapi.Pokemon | null>> = []

        for(let i = 0; i < maxLines; i++) {
            matriz[i] = []

            for (let j = 0; j < maxCols; j++) {
                matriz[i][j] = null
            }
        }

        return matriz
    }

    function getCol(line: number, col: number) {
        if(line == 0 && col == 0) {
            return (
                <Grid.Col className='grid-pokedoku grid-pokedoku-theme' span={3}>
                    <span>Imagem aleátória</span>
                </Grid.Col>    
            )
        }

        if(line == 0 || col == 0) {

            let theme = gameThemes.get(JSON.stringify({line, col}))
            
            if(theme === undefined) {
                return
            }

            return (
                <Grid.Col key={theme.Name + line + col} className='grid-pokedoku grid-pokedoku-theme' span={3}>
                    { theme.Name }
                </Grid.Col>
            )
        }

        // Colunas de respostas
        return (
            <Grid.Col onClick={() => getPokemon(line, col)} className='grid-pokedoku' span={3}>
                { answers[line][col] != null ? <Image src={answers[line][col].DefaultSprite}/> : `${line} - ${col}` }
            </Grid.Col>
        )
    }

    return (
        <div className="game-body">
            <Grid className='game-grid' gutter='sm'>
                { 
                    [...Array(maxLines)].map((_, i) => getAllCols(i)).flatMap(e => e)
                }
            </Grid>
        </div>
    )
}