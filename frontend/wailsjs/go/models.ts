export namespace pokeapi {
	
	export class Pokemon {
	    Id: number;
	    Name: string;
	    Region: string;
	    DefaultSprite: string;
	
	    static createFrom(source: any = {}) {
	        return new Pokemon(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Region = source["Region"];
	        this.DefaultSprite = source["DefaultSprite"];
	    }
	}

}

export namespace service {
	
	export class GameThemes {
	    Themes: Record<string, themes.Theme>;
	
	    static createFrom(source: any = {}) {
	        return new GameThemes(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Themes = this.convertValues(source["Themes"], themes.Theme, true);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Result {
	    Pokemon: pokeapi.Pokemon;
	    Message: string;
	    Correct: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Result(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Pokemon = this.convertValues(source["Pokemon"], pokeapi.Pokemon);
	        this.Message = source["Message"];
	        this.Correct = source["Correct"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace themes {
	
	export class Theme {
	    Type: string;
	    Name: string;
	    Sprite: string;
	
	    static createFrom(source: any = {}) {
	        return new Theme(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Type = source["Type"];
	        this.Name = source["Name"];
	        this.Sprite = source["Sprite"];
	    }
	}

}

