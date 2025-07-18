package main

import (
	"context"
	"pokedoku/business/themes"
	"pokedoku/pokeapi"
	"pokedoku/service"
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

func (a *App) GetRandomThemes() []themes.Theme {
	return a.Service.GetRandomThemes()
}
