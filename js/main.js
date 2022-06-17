let monto = parseInt(prompt('Cuanto dinero queres pedir prestado: '))
let cuotas = parseInt(prompt('En cuantas cuotas queres devolver el prestamo (min: 1 - max: 12): '))

class Prestamo{
    constructor(monto, cuotas){
        this.monto = monto;
        this.cuota = cuotas; 
    }
    calcular(monto, cuotas){
        let resultado = (monto + (monto * cuotas * 0.12)) / cuotas
        let total = (monto + (monto * (cuotas * 0.12)))
        alert('Vas a devolver ' + cuotas + ' cuotas de ' + resultado)
        alert('En total devolveras ' + total)
    }
}

const prestamo = new Prestamo(monto, cuotas)
prestamo.calcular(monto, cuotas)







/*calcularIntereses(monto, cuantasCuotas)

const existe = cuotas.find((cuota) => {
    cuota = cuantasCuotas
    return cuota
})*/