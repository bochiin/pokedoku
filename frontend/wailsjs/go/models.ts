export namespace pokeapi {
	
	export class Pokemon {
	    Id: number;
	    Name: string;
	    DefaultSprite: string;
	
	    static createFrom(source: any = {}) {
	        return new Pokemon(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.DefaultSprite = source["DefaultSprite"];
	    }
	}

}

