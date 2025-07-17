package pokeapi

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type mockRand struct {
	mock.Mock
}

func newMockRand() *mockRand {
	return &mockRand{}
}

func (m *mockRand) RandomInt(max int) int {
	args := m.Called(max)
	return args.Int(0)
}

func TestGetRandomType(t *testing.T) {

	pokeApiWrapper := NewPokeApiWrapper()

	mockRand := newMockRand()

	mockRand.On("RandomInt", 17).Return(0).Once()
	randomType1 := pokeApiWrapper.GetRandomType(mockRand)

	mockRand.On("RandomInt", 17).Return(1).Once()
	randomType2 := pokeApiWrapper.GetRandomType(mockRand)

	mockRand.On("RandomInt", 17).Return(2)
	randomType3 := pokeApiWrapper.GetRandomType(mockRand)

	fmt.Println(types[0])

	assert.Equal(t, types[0], *randomType1)
	assert.Equal(t, types[1], *randomType2)
	assert.Equal(t, types[2], *randomType3)
}
