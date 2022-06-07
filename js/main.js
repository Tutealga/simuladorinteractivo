let monto = prompt('Cuanto dinero quieres gastar: ')
let cuotas = prompt('En cuantas cuotas quieres abonar: ')

function cuantasCuotas(monto, cuotas){
    alert('Tendras que abonar ' + cuotas + ' cuotas de ' + monto/cuotas)
    for (i = monto; i > 0; i -= monto/cuotas){
        alert('Falta por pagar: ' + i)
    }
}

if (cuotas <= 12){
   cuantasCuotas(monto, cuotas)
}else{
    while (cuotas > 12){
        cuotas = prompt('Ingrese correctamente las cuotas: ')
    }
    cuantasCuotas(monto, cuotas)
}

