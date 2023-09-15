$(function() {
    let baseURL = "https://pokeapi.co/api/v2";
  
    // 1.
    $.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
      console.log(data);
    });
  
    // 2.
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(pokemon => {
        pokemon.forEach(p => console.log(p));
      });
  
    // 3.
    let names = null;
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(data => {
        names = data.map(d => d.name);
        return Promise.all(data.map(d => $.getJSON(d.species.url)))
      })
      .then(data => {
        let descriptions = data.map(d => {
          let descriptionObj = d.flavor_text_entries.find(
            entry => entry.language.name === "en"
          );
          return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
        });
        descriptions.forEach((desc, i) => {
          console.log(`${names[i]}: ${desc}`);
        });
      });
    });