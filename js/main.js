let monto = parseInt(prompt('Cuanto dinero queres pedir prestado: '))
let cuantasCuotas = parseInt(prompt('En cuantas cuotas queres devolver el prestamo (min: 1 - max: 12): '))

const cuotas = [1,2,3,4,5,6,7,8,9,10,11,12]

const existe = cuotas.find((cuota) => {
    return cuota === cuantasCuotas
 })

class Prestamo{
    constructor(monto, cuotas){
        this.monto = monto;
        this.cuota = cuotas; 
    }
    calcular(monto, cuotas){
        let resultado = (monto + (monto * cuotas * 0.12)) / cuotas
        let total = monto + (monto * cuotas * 0.12)
        alert('Vas a devolver ' + cuotas + ' cuotas de ' + resultado)
        alert('En total devolveras ' + total)
    }
}

const prestamo = new Prestamo(monto, existe)
prestamo.calcular(monto, existe)