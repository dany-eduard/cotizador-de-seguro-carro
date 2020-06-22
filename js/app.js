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

//Constructor Seguro, recolecta los datos del formulario
class Seguro {
    constructor(marca, anio, tipoSeguro) {
        this.marca = marca;
        this.anio = anio;
        this.tipoSeguro = tipoSeguro;
    }

    cotizarSeguro() {
        /*
            1 = Americano - 1.15
            2 = Asiático - 1.05
            3 = Europeo - 1.35
        */
        let valorSeguro;
        const base = 2000; //Precio inicial 
        switch (this.marca) {
            case '1':
                valorSeguro = base * 1.15;
                break;
            case '2':
                valorSeguro = base * 1.05;
                break;
            case '3':
                valorSeguro = base * 1.35;
                break;
        }
        console.log(valorSeguro)

        const anioDiferencia = new Date().getFullYear() - this.anio;
        //Cada año de diferencia reduce un 3%
        valorSeguro -= (anioDiferencia * 3 * valorSeguro) / 100;

        /**
         * Si el seguro es básico se multiplica por 30% más
         * Si el seguro es completo se multiplica 50%
         */
        if (this.tipoSeguro === "basico") {
            valorSeguro *= 1.30;
        } else {
            valorSeguro *= 1.50;
        }
        console.log(valorSeguro)
        return valorSeguro;
    }
}

//Se obtienen los datos del formulario
const formulario = document.getElementById("cotizar-seguro");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const marcaSeleccionada = document.getElementById("marca").options[marca.selectedIndex].value;//Se lee el valor de el campo marca
    const anioSeleccionado = document.getElementById('anio').options[anio.selectedIndex].value;//Se lee el valor seleccionado en el campo anio
    const tipo = document.querySelector('input[name=tipo]:checked').value;//Se lee el valor seleccionado en radio con nombre tipo

    //Crear instancia de Interfaz()
    const interfaz = new Interfaz();
    //Si se encuentran resultados anteriores se eliminan del DOM
    if (document.querySelector('#resultado div') != null) {
        document.querySelector('#resultado div').remove();
    }
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        interfaz.mostrarMensajes('Faltan datos, revise por favor e ingrese la información requerida', 'error')
    } else {

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo); //Instanciar seguro
        const valorSeguroTotal = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, valorSeguroTotal);
        interfaz.mostrarMensajes('Cotizando', 'correcto')
    }

});

class Interfaz {
    mostrarMensajes(mensaje, tipo) {
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('#cargando'));
        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 4000);
    }

    mostrarResultado(seguro, total) {
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = "Americano";
                break;
            case '2':
                marca = "Asiático";
                break;
            case '3':
                marca = "Europeo";
                break;
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <p class='header'>RESUMEN</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipoSeguro}</p>
            <p>Total: $ ${total}</p>
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        document.querySelector('button').style.display = 'none';//Ocultar botón cotizar mientras se "procesan" los datos
        setTimeout(() => {
            spinner.style.display = 'none';
            document.getElementById('resultado').appendChild(div);//Muestra resumen en el DOM
            document.querySelector('button').style.display = 'block';
        }, 4000);
    }
}

