/// <reference types="jquery" />

const $BOTON_ACTUALIZAR = $("#boton-actualizar");
const $DROP_DOWN_MONEDAS = $(".dropdown-menu");
const $FECHA = $("#fecha-input");
let moneda = undefined;

function actualizarDropDownMonedas() {
    fetch("https://api.exchangeratesapi.io/latest")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.rates).forEach(moneda => {
            $DROP_DOWN_MONEDAS.append(`<a class="dropdown-item" href="#">${moneda}</a>`)
        })
    })
}


//El if en la función de abajo creo que es innecesario, PROBAR SACARLO
$DROP_DOWN_MONEDAS.click(evento => {
    const $elemento_clickeado = evento.target;
    if ($elemento_clickeado.classList.contains("dropdown-item")) {
        $("#dropdownMenuButton").text(`${$elemento_clickeado.text}`);
        moneda = $elemento_clickeado.text;
    }
})

$BOTON_ACTUALIZAR.click(() => {
    const fecha = $FECHA.val();

    $("#tabla").empty();
    $("#mensaje").empty();

    fetch(`https://api.exchangeratesapi.io/${fecha}?base=${moneda}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        $("#mensaje").append(`<div class="alert alert-secondary">Los valores de cambio para la moneda ${moneda} del día ${fecha} son:</div>`)
        let indice = 1;
        Object.keys(respuesta.rates).forEach((monedas, valores) => {
            $("#tabla").append(`<tr></tr>`).append(`<th scope="row">${indice}</th>`, `<td>${monedas}</td>`, `<td>${respuesta.rates[monedas]}</td>`);
            indice ++;
        })
    })
    .catch(error => {$("#mensaje").append(`<div class="alert alert-danger">No se puede acceder a exchangerates.io o ha seleccionado una fecha incorrecta (mínimo 4 de Enero de 1999)</div>`)})
})

actualizarDropDownMonedas();
