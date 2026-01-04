package themes

import (
	"pokedoku/src/pokeapi"
	"testing"

	"github.com/mtslzr/pokeapi-go/structs"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type mockRand struct {
	mock.Mock
}

type mockPokeApi struct {
	mock.Mock
}

func newMockRand() *mockRand {
	return &mockRand{}
}

func newMockPokeApi() *mockPokeApi {
	return &mockPokeApi{}
}

func (m *mockRand) RandomInt(max int) int {
	args := m.Called(max)
	return args.Int(0)
}

func (m *mockPokeApi) FindPokemon(name string) *pokeapi.Pokemon {
	m.Called(name)
	return &pokeapi.Pokemon{}
}

func (m *mockPokeApi) GetRegions() []pokeapi.Region {
	return make([]pokeapi.Region, 0)
}

func (m *mockPokeApi) FindSpecies(name string) (result *structs.PokemonSpecies, err error) {
	return &structs.PokemonSpecies{}, nil
}

func TestGetRandomType(t *testing.T) {

	mockRand := newMockRand()
	mockPokeApi := newMockPokeApi()

	mockParams := ParamRandTheme{
		mockRand,
		mockPokeApi,
	}

	mockRand.On("RandomInt", 17).Return(0).Once()
	randomType1 := getRandomType(mockParams)

	mockRand.On("RandomInt", 17).Return(1).Once()
	randomType2 := getRandomType(mockParams)

	mockRand.On("RandomInt", 17).Return(2)
	randomType3 := getRandomType(mockParams)

	esperado1 := Theme{
		pokeapi.TYPE,
		"normal",
		"1.png",
	}

	esperado2 := Theme{
		pokeapi.TYPE,
		"fighting",
		"2.png",
	}

	esperado3 := Theme{
		pokeapi.TYPE,
		"flying",
		"3.png",
	}

	assert.Equal(t, esperado1, randomType1)
	assert.Equal(t, esperado2, randomType2)
	assert.Equal(t, esperado3, randomType3)
}
