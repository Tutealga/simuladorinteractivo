let cantidad = prompt('Cuanto dinero quieres pedir prestado: ')
let cuotas = prompt('En cuantas cuotas quieres devolverlo: ')

function calcular(cantidad, cuotas){
    calculo = (cantidad + (cantidad * (0.12 * cuotas))) / cuotas
    total = (cantidad + (cantidad * (0.12 * cuotas)))
    function devolucionCuotas(cuotas, calculo){
        alert('Tendras que devolver ' + cuotas + ' cuotas de ' + calculo)
    }
    function totalPagar(total){
        alert('Tendras que devolver ' + total)
    }
}

