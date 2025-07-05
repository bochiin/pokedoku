package service

import (
	"pokedoku/service/pokeapi"
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
