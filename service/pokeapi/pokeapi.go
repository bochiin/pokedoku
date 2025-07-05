package pokeapi

import "github.com/mtslzr/pokeapi-go"

type PokeApi interface {
	FindPokemon(name string) *Pokemon
}

type Pokemon struct {
	Id            uint
	Name          string
	DefaultSprite string
}

type PokeaApiWrapper struct{}

func NewPokeApiWrapper() *PokeaApiWrapper {
	return &PokeaApiWrapper{}
}

func (wrapper *PokeaApiWrapper) FindPokemon(name string) *Pokemon {
	poke, err := pokeapi.Pokemon(name)

	if err != nil {
		// Error handling
	}

	return &Pokemon{
		Id:            uint(poke.ID),
		Name:          poke.Name,
		DefaultSprite: poke.Sprites.FrontDefault,
	}
}
