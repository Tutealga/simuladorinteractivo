const DateTime = luxon.DateTime
const date = DateTime.now();

let pie = document.getElementById("pie");

pie.textContent = `Actualizado el ${date.toLocaleString(DateTime.DATETIME_SHORT)}`;

function tablaDivisas(json, tipo){
    let tr = document.createElement("tr");
    let {compra, venta} = json;
    let compraConvertido = compra.toLocaleString("es-AR", {style: "currency",currency: "ARG"}).replace(/[$]/g,'');
    let ventaConvertido = venta.toLocaleString("es-AR", {style: "currency",currency: "ARG"}).replace(/[$]/g,'');
    tr.innerHTML = `<td>${tipo}</td>
                    <td>${compraConvertido}</td>
                    <td>${ventaConvertido}</td>`;   
    let tabla = document.querySelector(".tabla");
    tabla.appendChild(tr);
}

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolaroficial")
.then(response => response.json())
.then(json => {
    tablaDivisas(json, "OFICIAL");    
}
    )
    .catch(error =>
        console.warn(error)
    );

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue")
.then(response => response.json())
.then(json => {
    tablaDivisas(json, "BLUE");
}
    )
.catch(error =>
        console.warn(error)
    );

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarbolsa")
    .then(response => response.json())
    .then(json => {
        tablaDivisas(json, "BOLSA");
    }
    )
    .catch(error =>
        console.warn(error)
    );

    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/contadoliqui")
    .then(response => response.json())
    .then(json => {
        tablaDivisas(json, "CONTADO CON LIQUI");
    }
    )
    .catch(error =>
        console.warn(error)
    );

    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarturista")
    .then(response => response.json())
    .then(json => {
        tablaDivisas(json, "TURISTA");
    }
    )
    .catch(error =>
        console.warn(error)
    );

    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarpromedio")
    .then(response => response.json())
    .then(json => {
        tablaDivisas(json, "PROMEDIO");
    }
    )
    .catch(error =>
        console.warn(error)
    );

    $('th').click(function() {
        let tabla = $(this).parents('table').eq(0)
        let filas = tabla.find('tr:gt(0)').toArray().sort(comparar($(this).index()))
        this.ascendente = !this.ascendente
        if (!this.ascendente) {
          filas = filas.reverse()
        }
        for (let i = 0; i < filas.length; i++) {
          tabla.append(filas[i])
        }
        icono($(this), this.ascendente);
    })
    
    function comparar(index) {
    return function(a, b) {
        let valorA = celda(a, index),
        valorB = celda(b, index)
        return $.isNumeric(valorA) && $.isNumeric(valorB) ? valorA - valorB : valorA.localeCompare(valorB)
    }
    }
    
    function celda(fila, index) {
    return $(fila).children('td').eq(index).html()
    }
    
    function icono(elemento, ascendente) {
    $("th").each(function(index) {
        $(this).removeClass("ordenar");
        $(this).removeClass("ascendente");
        $(this).removeClass("descendente");
    });
    
    elemento.addClass("ordenar");
    if (ascendente) elemento.addClass("ascendente");
    else elemento.addClass("descendente");
    }

