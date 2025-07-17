package pokeapi

import (
	"pokedoku/util/random"

	"github.com/mtslzr/pokeapi-go"
)

type PokeApi interface {
	FindPokemon(name string) *Pokemon
}

type Type struct {
	Name          string
	DefaultSprite string
}

type Pokemon struct {
	Id            uint
	Name          string
	DefaultSprite string
}

var types = [...]Type{
	{"normal", "1.png"},
	{"fighting", "2.png"},
	{"flying", "3.png"},
	{"poison", "4.png"},
	{"ground", "5.png"},
	{"rock", "6.png"},
	{"bug", "7.png"},
	{"ghost", "8.png"},
	{"steel", "9.png"},
	{"fire", "10.png"},
	{"water", "11.png"},
	{"grass", "12.png"},
	{"electric", "13.png"},
	{"psychic", "14.png"},
	{"ice", "15.png"},
	{"dragon", "16.png"},
	{"dark", "17.png"},
	{"fairy", "18.png"},
}

type PokeaApiWrapper struct {
}

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

func (wrapper *PokeaApiWrapper) GetRandomType(rand random.RandomNumberGenerator) *Type {
	return &types[rand.RandomInt(len(types)-1)]
}
