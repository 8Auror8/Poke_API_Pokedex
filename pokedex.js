//container asociado
const pokemonCont = document.querySelector('#pokedex');


//atacamos api, y la guardamos en variable en variable
let number = 150;
const pokemonApi = async () =>{
    try{
        const request = await fetch(`https://pokeapi.co/api/v2/pokemon/?&limit=${number}`);
        const response = await request.json();
/*         console.log(response.results); */
        drawPokemon(response.results);
        drawInput(response.results);
    }catch(error){
        console.error('Error en la solicitud de Información en PokemonAPI a la API:', error);
    }
}

//averiguar el color/tipo del pokemon
const pokemonColorApi = async (indexPok) =>{
    try{
        const requestColor = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${indexPok}/`);
        const responseColor = await requestColor.json();
/*         console.log('response color información', responseColor); */
        return responseColor.color.name;
    }catch(error){
        console.error('Error en la solicitud de Color en PokemonAPI a la API:', error);
    }
}

//averiguamos el ataque del pokemon
/* const ataquePokemon = async (indexPok) => {
    try{
        const requestAttacks = await fetch(`https://pokeapi.co/api/v2/move/${indexPok}/`);
        const responseAttacks = await requestAttacks.json();
        const arrayAttacks = responseAttacks.contest_combos.normal.use_before;
        console.log('estos son los ataques del pokemon', arrayAttacks);
    }catch(error){
        console.error(error);
    }
} */

//dibuja el input escogido
const drawInput = (response) => {
    const myInput = document.querySelector("input");
    console.log("estamos en drawInput");
    myInput.addEventListener("input", () => searchPokemon(response, myInput.value));
}

//Busca el pokemon del Input

const searchPokemon = (response, filtro) =>{
    let searching = response.filter((respons)=>respons.name.toLowerCase().includes(filtro.toLowerCase()))
    console.log('funcion searching', searching);
    console.log('estamos dentro de searchPokemon');
    (async()=>{
        try{
            await drawPokemon(searching);
        }catch(error){
            console.error(error)
        }
    })();
/*     drawPokemon(searching); */
}



//mapeamos información y creamos bucle que inyectará código en HTML

const drawPokemon = async (data) => {

    console.log(Array.isArray(data));

    if(data){
        console.log('limpiamos landing');
        pokemonCont.innerHTML = "";
        for(let i=0; i < data.length; i++){
            const indexPok = data[i].url.split('/')[6];
            const colorPok = await pokemonColorApi(indexPok);
            const namePok = data[i].name;
            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexPok}.png`;
            /* const ataque = await ataquePokemon(indexPok); */
            /* const pokeColor = pokeType.color[0]; */
            /* console.log('el pokeColorAPI es:', pokeType ); */
            const htmlStr = `
                <article class="card ${colorPok}">
                    <h2 class="card-title">${namePok}</h2>
                    <div class = "img-container">
                        <img class="pretty-image" src="${urlImg}" alt="${namePok}">
                        <h3 class="index">${indexPok}</h3>
                    </div>
                </article>`
            pokemonCont.insertAdjacentHTML('beforeend', htmlStr);
            pokemonCont.style.opacity = 1;
            }
    }
/*     drawInput(data); */
}

pokemonApi();