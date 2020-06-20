const anioMax = new Date().getFullYear(), //Se genera el año máximo del modelo del auto (año actual)
    anioMin = anioMax - 20; //El año mínimo respaldado por el seguro es de 20 años

const selectAnios = document.getElementById("anio");
for (let i = anioMax; i > anioMin; i--) {
    //Se insertan los años en el select HTML
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

//Se obtienen los datos del formulario
const formulario = document.getElementById("cotizar-seguro");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const marcaSeleccionada = document.getElementById("marca").options[marca.selectedIndex].value;//Se lee el valor de el campo marca
    const anioSeleccionado = document.getElementById('anio').options[anio.selectedIndex].value;//Se lee el valor seleccionado en el campo anio
    const tipo = document.querySelector('input[name]="tipo"]:checket').value;//Se lee el valor seleccionado en checkbox con nombre tipo

});

//Constructor Seguro, recolecta los datos del formulario
function Seguro(marca, anio, tipoSeguro) {
    this.marca = marca;
    this.anio = anio;
    this.tipoSeguro = tipoSeguro;
}

function Interfaz() { }
