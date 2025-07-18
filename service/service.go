package service

import (
	"pokedoku/business/themes"
	"pokedoku/pokeapi"
	"pokedoku/util/random"
)

type PokeApiService struct {
	pokeApi pokeapi.PokeApi
}

func NewPokeApiService(pokeApi pokeapi.PokeApi) *PokeApiService {
	return &PokeApiService{
		pokeApi: pokeApi,
	}
}

func (service *PokeApiService) FindByPokemon(name string) *pokeapi.Pokemon {
	return service.pokeApi.FindPokemon(name)
}

func (service *PokeApiService) GetRandomThemes() []themes.Theme {
	params := themes.ParamRandTheme{
		Rand:    random.NewStandardRand(),
		Wrapper: service.pokeApi,
	}

	gameThemes := make([]themes.Theme, 0)

	for range 6 {
		gameThemes = append(gameThemes, themes.GetRandomTheme(params))
	}

	return gameThemes
}
