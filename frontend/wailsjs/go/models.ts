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

export namespace themes {
	
	export class Theme {
	    Code: string;
	    Name: string;
	    Sprite: string;
	
	    static createFrom(source: any = {}) {
	        return new Theme(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Code = source["Code"];
	        this.Name = source["Name"];
	        this.Sprite = source["Sprite"];
	    }
	}

}

