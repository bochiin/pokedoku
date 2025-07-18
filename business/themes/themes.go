package themes

import (
	"maps"
	"pokedoku/pokeapi"
	"pokedoku/util/random"
	"slices"
)

type Theme struct {
	Code   pokeapi.ThemeType
	Name   string
	Sprite string
}

type ParamRandTheme struct {
	Rand    random.RandomNumberGenerator
	Wrapper pokeapi.PokeApi
}

var mapThemes = map[pokeapi.ThemeType]func(params ParamRandTheme) Theme{
	pokeapi.TYPE:           getRandomType,
	pokeapi.GIGANTAMAX:     getGMaxTheme,
	pokeapi.MEGA_EVOLUTION: getMegaEvolutionTheme,
	pokeapi.REGION:         getRegionTheme,
}

func getRandomType(params ParamRandTheme) Theme {
	randInt := params.Rand.RandomInt(len(pokeapi.Types) - 1)

	typePoke := pokeapi.Types[randInt]

	return Theme{
		pokeapi.TYPE,
		typePoke.Name,
		typePoke.DefaultSprite,
	}
}

func getGMaxTheme(params ParamRandTheme) Theme {
	return Theme{
		pokeapi.GIGANTAMAX,
		"gmax",
		"",
	}
}

func getMegaEvolutionTheme(params ParamRandTheme) Theme {
	return Theme{
		pokeapi.MEGA_EVOLUTION,
		"mega evolution",
		"",
	}
}

func getRegionTheme(params ParamRandTheme) Theme {
	regions := params.Wrapper.GetRegions()

	randInt := params.Rand.RandomInt(len(regions) - 1)

	region := regions[randInt]

	return Theme{
		pokeapi.REGION,
		region.Name,
		"",
	}
}

func GetRandomTheme(params ParamRandTheme) Theme {
	keys := slices.Collect(maps.Keys(mapThemes))

	randInt := params.Rand.RandomInt(len(keys) - 1)

	theme := keys[randInt]

	funcTheme := mapThemes[theme]

	return funcTheme(params)
}
