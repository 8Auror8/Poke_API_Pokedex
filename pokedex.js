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

//averiguamos damage del pokemon
const abilityPokemon = async (indexPok) => {
    try{
        const requestAbilities = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPok}/`);
        const responseAbilities = await requestAbilities.json();
        const specificAbility = responseAbilities.abilities/* [0].ability.name */;
       /*  return specificAbility; */
        console.log(specificAbility);
        console.log('el legth de especific ability es:', specificAbility.length)
        if(specificAbility.length == 3){
            return specificAbility[2].ability.name
        }else if(specificAbility.length == 2){
            return specificAbility[1].ability.name
        }else if(specificAbility.length == 1){
            return specificAbility[0].ability.name;
        }
        /* console.log('type of comboExists', typeof(combosExists)); */
        /* var damageClass = await responseAttacks.damage_class; */
        /* console.log('indepok', indexPok, combosExists); */
        /* console.log('combosExist es undefined?', combosExists == undefined); */
        /* const arrayAttacks = responseAttacks.contest_combos.normal.use_after;
        const beforeAttacks = responseAttacks.contest_combos.normal.use_before;
        console.log('array attacks', arrayAttacks, 'beforeattacks', beforeAttacks); */

/*
        if(combosExists !== null || combosExists !== undefined){
            console.log('estamos dentro');
            if(arrayAttacks !== undefined){
                return arrayAttacks[0].name;
            }else{
                return beforeAttacks[0].name;
            }
        }else{
            console.log("aqui estamos");
        } */
    }catch(error){
        console.error(error);
    }
}

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
        /* console.log('limpiamos landing'); */
        pokemonCont.innerHTML = "";
        for(let i=0; i < data.length; i++){
            const indexPok = data[i].url.split('/')[6];
            const colorPok = await pokemonColorApi(indexPok);
            const namePok = data[i].name;
            const abilityPok = await abilityPokemon(indexPok);
            console.log('indexPok es: ', indexPok, 'abilityPok es: ', abilityPok);
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
                    <h3 class="ability">${abilityPok}</h3>
                </article>`
            pokemonCont.insertAdjacentHTML('beforeend', htmlStr);
            pokemonCont.style.opacity = 1;
            }
    }
/*     drawInput(data); */
}

pokemonApi();