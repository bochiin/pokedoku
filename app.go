package main

import (
	"context"
	"pokedoku/service"
	"pokedoku/service/pokeapi"
)

// App struct
type App struct {
	ctx     context.Context
	Service *service.PokeApiService
}

// NewApp creates a new App application struct
func NewApp(pas *service.PokeApiService) *App {
	return &App{
		Service: pas,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetPokemon(pokemon string) pokeapi.Pokemon {
	return *a.Service.FindByPokemon(pokemon)
}
