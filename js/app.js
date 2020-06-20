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
