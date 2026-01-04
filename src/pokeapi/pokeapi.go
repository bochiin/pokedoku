package pokeapi

import (
	"log"

	"github.com/mtslzr/pokeapi-go"
	"github.com/mtslzr/pokeapi-go/structs"
)

type PokeApi interface {
	FindPokemon(name string) *Pokemon
	GetRegions() []Region
	FindSpecies(name string) (*structs.PokemonSpecies, error)
}

type Pokemon struct {
	Id            uint
	Name          string
	Region        string
	DefaultSprite string
}

type Region struct {
	Name string
}

type Type struct {
	Name          string `json:"Name"`
	DefaultSprite string `json:"DefaultSprint"`
}

type ThemeType string

const (
	MEGA_EVOLUTION ThemeType = "mega"
	TYPE           ThemeType = "type"
	GIGANTAMAX     ThemeType = "gmax"
	REGION         ThemeType = "region"
)

var Types = [...]Type{
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

var Generation = map[string]string{
	"generation-i":    "kanto",
	"generation-ii":   "johto",
	"generation-iii":  "hoenn",
	"generation-iv":   "sinnoh",
	"generation-v":    "unova",
	"generation-vi":   "kalos",
	"generation-vii":  "alola",
	"generation-viii": "galar",
	"generation-ix":   "paldea",
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
		Region:        "",
		DefaultSprite: poke.Sprites.FrontDefault,
	}
}

func (wrapper *PokeaApiWrapper) GetRegions() []Region {
	resource, err := pokeapi.Resource("region")

	if err != nil {
		log.Fatal("Erro ao buscar regiões " + err.Error())
	}

	regions := make([]Region, 0, resource.Count)

	for _, result := range resource.Results {
		region := Region{
			result.Name,
		}

		regions = append(regions, region)
	}

	return regions
}

func (wrapper *PokeaApiWrapper) FindSpecies(name string) (result *structs.PokemonSpecies, err error) {

	specie, err := pokeapi.PokemonSpecies(name)

	if err != nil {
		return &structs.PokemonSpecies{}, err
	}

	return &specie, nil
}
