package service

import (
	"encoding/json"
	"pokedoku/src/business/themes"
	"pokedoku/src/pokeapi"
	"pokedoku/src/util/random"
	"slices"
)

type PokeApiService struct {
	pokeApi pokeapi.PokeApi
}

type coordinate struct {
	Line uint8 `json:"line"`
	Col  uint8 `json:"col"`
}

type GameThemes struct {
	Themes map[string]themes.Theme
}

func NewPokeApiService(pokeApi pokeapi.PokeApi) *PokeApiService {
	return &PokeApiService{
		pokeApi: pokeApi,
	}
}

func (service *PokeApiService) FindByPokemon(name string) *pokeapi.Pokemon {
	return service.pokeApi.FindPokemon(name)
}

func (service *PokeApiService) GetGameThemes() GameThemes {
	params := themes.ParamRandTheme{
		Rand:    random.NewStandardRand(),
		Wrapper: service.pokeApi,
	}

	currentSelectedThemes := make([]themes.Theme, 6)
	gameThemes := make(map[string]themes.Theme, 6)

	var line uint8 = 0
	var col uint8 = 1

	for len(gameThemes) != 6 {
		theme := themes.GetRandomTheme(params)

		if slices.Contains(currentSelectedThemes, theme) {
			continue
		}

		currentSelectedThemes = append(currentSelectedThemes, theme)

		json, _ := json.Marshal(coordinate{line, col})

		gameThemes[string(json)] = theme

		if col == 3 {
			col = 0
			line = 0
		}

		if col == 0 {
			line++
		} else {
			col++
		}
	}

	return GameThemes{gameThemes}
}
