//container asociado
const pokemonCont = document.querySelector('#pokedex');


//atacamos api, y la guardamos en variable en variable
let number = 150;
const pokemonApi = async () =>{
    try{
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/?&limit=${number}`);
        const response = await request.json();
        /* console.log(response.results); */
        drawPokemon(response.results);
    }catch(error){
        console.error('Error en la solicitud de Información en PokemonAPI a la API:', error);
    }
}

//averiguar el color/tipo del pokemon
const pokemonColorApi = async (indexPok) =>{
    try{
        const requestColor = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${indexPok}/`);
        const responseColor = await requestColor.json();
        console.log('aquí está el jodido color', responseColor.color.name);
/*         return responseColor.color.name; */
        return responseColor.color.name;
    }catch(error){
        console.error('Error en la solicitud de Color en PokemonAPI a la API:', error);
    }
}

//dibuja el input escogido
const drawInput = (response) => {
    const myInput = document.querySelector("input");

    myInput.addEventListener("input", () => searchPokemon(response, myInput.value));
}

//Busca el pokemon del Input

const searchPokemon = (response, filtro) =>{
    let searching = response.filter((respons)=>respons.name.toLowerCase().includes(filtro.toLowerCase()))
    console.log(searching);
    drawPokemon(searching);
}



//mapeamos información y creamos bucle que inyectará código en HTML

const drawPokemon = async (data) => {

    pokemonCont.innerHTML = "";

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
    }drawInput(data);
}

pokemonApi();