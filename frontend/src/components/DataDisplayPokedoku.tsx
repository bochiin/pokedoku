import { Button, ColorSchemeScript, Grid, Image, Input, Skeleton, Space } from "@mantine/core";
import "./DataDisplayPokedoku.css";
import React, { useEffect, useState } from "react";
import { GetRandomThemes } from "../../wailsjs/go/main/App";
import { pokeapi, themes } from "../../wailsjs/go/models";

interface Answer {
  pokemon: pokeapi.Pokemon | null
  correct: boolean
  answer: string
}

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


  function getAllCols(line: number) {
    let cols = [];

    for (let i = 0; i < maxCols; i++) {
      cols.push(getCol(line, i));
    }

    return cols;
  }

  function initGameMatrix() {
    let matriz: Answer[][] = [];

    for (let i = 0; i < maxLines; i++) {
      matriz[i] = [];

      for (let j = 0; j < maxCols; j++) {
        matriz[i][j] = {
            answer: "",
            correct: false,
            pokemon: null
        };
      }
    }

    return matriz;
  }

  function handleChangeAnswers(event: React.ChangeEvent<HTMLInputElement>, line: number, col: number) {
      const copy = [...answers];

      copy[line][col] = {
        ...copy[line][col],
        answer: event.target.value
      };

      setAnwsers(copy);
  }

  function answer(line: number, col: number) {
    console.log(answers[line][col].answer)
  }

  function getCol(line: number, col: number) {

    // First line and col dont have any theme/answer
    if (line == 0 && col == 0) {
      return (
        <Grid.Col className="grid-pokedoku grid-pokedoku-theme" span={3}>
          <span>Imagem aleátória</span>
        </Grid.Col>
      );
    }

    // Game themes
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

    // Game Answers
    return (
      <Grid.Col
        className="grid-pokedoku"
        key={`answer-${line}-${col}`}
        span={3}
      >
        {
          answers[line][col].correct ? 
            <Image src={answers[line][col].pokemon!.DefaultSprite} />
            : 
            <>
              <Input 
                value={answers[line].at(col)!.answer} 
                onChange={(event) => handleChangeAnswers(event, line, col)} 
                placeholder="Digite um Pokémon" />
              <Space w="md" />
              <Button onClick={() => answer(line, col)} variant="light">Enviar</Button>
            </>
            
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
