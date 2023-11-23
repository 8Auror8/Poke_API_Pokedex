//container asociado
const pokemonCont = document.querySelector('#pokedex');

var pokemonsData

//atacamos api, y la guardamos en variable en variable
let number = 150;
const pokemonApi = async () =>{
    try{
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/?&limit=${number}`);
        const response = await request.json();
    /*     console.log(response.results); */
        drawPokemon(response.results);
    }catch(error){
        console.error('Error en la solicitud de Información en PokemonAPI a la API:', error);
    }
}

const pokemonColorApi = async (indexPok) =>{
    try{
        const requestColor = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${indexPok}/`);
        const responseColor = await requestColor.json();
        console.log('aquí está el jodido color', responseColor.color.name);
        return responseColor.color.name;
    }catch(error){
        console.error('Error en la solicitud de Color en PokemonAPI a la API:', error);
    }
}


//mapeamos información y creamos bucle que inyectará código en HTML

const drawPokemon = async (data) => {
    console.log(Array.isArray(data));
    if(Array.isArray(data)){
        for(let i=0; i < data.length; i++){
            const divCarta = document.createElement('div');
            const indexPok = data[i].url.split('/')[6];
            const colorPok = await pokemonColorApi(indexPok);
            const namePok = data[i].name;
            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexPok}.png`;
            /* const pokeColor = pokeType.color[0]; */
            /* console.log('el pokeColorAPI es:', pokeType ); */
            divCarta.innerHTML = `
                <article class="card ${colorPok}">
                    <h2 class="card-title">${namePok}</h2>
                    <div class = "img-container">
                        <img class="pretty-image" src="${urlImg}" alt="${namePok}">
                    </div>
                    <h3 class="card-subtitle">${indexPok}</h3>
                </article>`
                pokemonCont.appendChild(divCarta);
            }
    }
}

/* https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexPok}.png

https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indexPok}.svg */

pokemonApi();