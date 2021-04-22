//url de la api a consumir
const API = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=00";
const APIimagen = "";
let idPokemon = 0;

//consumir api
const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((json) => {
      llenarDatos(json), paginacion(json.info);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

//llenar cards con personajes
const llenarDatos = (data) => {
  data.results.forEach((pj) => {
    const pokeURL = pj.url;
    return fetch(pokeURL)
      .then((response) => response.json())
      .then((json) => {
        tarjetaPokemon(json);
      });
  });
};

const tarjetaPokemon = (data) => {
  let html = "";
  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 10rem;">';
  html += `<img src="${data.sprites.front_default}" class="card-img-top" alt="...">`;
  html += '<div class="card-body">';
  html += `<h5 class = "card-title" >${data.name}</h5>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("datosPersonajes").innerHTML += html;
};

//paginacion
const paginacion = (info) => {
  let prevDisable = "";
  let nextDisable = "";

  if (info.prev == null) {
    prevDisable = "disabled";
  } else {
    prevDisable = "";
  }

  if (info.next == null) {
    nextDisable = "disabled";
  } else {
    nextDisable = "";
  }

  let html = "";
  html += `<li class="page-item ${
    info.prev ? "" : "disabled"
  }"> <a class="page-link" onclick="getData('${info.prev}')">Prev</a> </li>`;
  html += `<li class="page-item ${
    info.next ? "" : "disabled"
  }"> <a class="page-link" onclick="getData('${info.next}')">Next</a> </li>`;
  document.getElementById("paginacion").innerHTML = html;
};

//ejecutar api
getData(API);
