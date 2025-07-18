package random

import (
	"math/rand"
	"time"
)

type RandomNumberGenerator interface {
	RandomInt(max int) int
}

type StandardRand struct{}

func (s *StandardRand) RandomInt(max int) int {
	rand.New(rand.NewSource(time.Now().UnixNano()))

	return rand.Intn(max)
}

func NewStandardRand() *StandardRand {
	return &StandardRand{}
}
