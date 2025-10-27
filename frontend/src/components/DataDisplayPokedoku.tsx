import { Grid, Image, Input, Skeleton } from "@mantine/core";
import "./DataDisplayPokedoku.css";
import { useEffect, useState } from "react";
import { GetPokemon, GetRandomThemes } from "../../wailsjs/go/main/App";
import { pokeapi, themes } from "../../wailsjs/go/models";

export function DataDisplayPokedoku() {
  const maxLines = 4;
  const maxCols = 4;

  const [answers, setAnwsers] = useState(initGameMatrix());
  const [themes, setThemes] = useState<Record<string, themes.Theme>>({});
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadGameThemes = async () => {
      let gameThemes = await GetRandomThemes()
  
      setThemes(gameThemes.Themes)
      setLoading(false)
    }

    loadGameThemes()

  }, []);

  async function getPokemon(line: number, col: number) {
    const pokemon = await GetPokemon("charmander");

    const copy = [...answers];

    copy[line][col] = pokemon;

    setAnwsers(copy);
  }

  function getAllCols(line: number) {
    let cols = [];

    for (let i = 0; i < maxCols; i++) {
      cols.push(getCol(line, i));
    }

    return cols;
  }

  function initGameMatrix() {
    let matriz: Array<Array<pokeapi.Pokemon | null>> = [];

    for (let i = 0; i < maxLines; i++) {
      matriz[i] = [];

      for (let j = 0; j < maxCols; j++) {
        matriz[i][j] = null;
      }
    }

    return matriz;
  }

  function getCol(line: number, col: number) {
    if (line == 0 && col == 0) {
      return (
        <Grid.Col className="grid-pokedoku grid-pokedoku-theme" span={3}>
          <span>Imagem aleátória</span>
        </Grid.Col>
      );
    }

    if (line == 0 || col == 0) {

      let theme = themes[JSON.stringify({ line, col })];

      return (
        <Grid.Col
          key={theme.Name + line + col}
          className="grid-pokedoku grid-pokedoku-theme"
          span={3}
        >
          {theme.Name}
        </Grid.Col>
      );
    }

    // Colunas de respostas
    return (
      <Grid.Col
        className="grid-pokedoku"
        span={3}
      >
        {
          answers[line][col] != null ? 
            <Image src={answers[line][col].DefaultSprite} />
            : 
            <Input placeholder="Digite um Pokémon" />
        }
      </Grid.Col>
    );
  }

  return (
    <div className="game-body">
      <Grid className="game-grid" gutter="sm">
        {
          loading ? 
          <Skeleton height={720} mt={6} radius="xl" />
          :
          [...Array(maxLines)].map((_, i) => getAllCols(i)).flatMap((e) => e)
        }
      </Grid>
    </div>
    
  );
}
