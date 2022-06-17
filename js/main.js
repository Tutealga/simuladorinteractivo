class Prestamo{
    constructor(){
        this.cantidad = 0;
        this.cuotas = 0; 
    }
    setCantidad(value) {this.cantidad = value}
    setCuotas(cuotas) { this.cuotas = cuotas}
    calcular(cantidad, cuotas){
        calculo = (cantidad + (cantidad * (0.12 * cuotas))) / cuotas
        total = (cantidad + (cantidad * (0.12 * cuotas)))
    }
    devolucionCuotas(cuotas, calculo){
        alert('Tendras que devolver ' + cuotas + ' cuotas de ' + calculo)
    }
    totalPagar(total){
        alert('Tendras que devolver ' + total)
    }
    }

    
class Cuota{
    constructor(cuotas){
        this.cuotas = cuotas
    }
}

const prestamo = new Prestamo()
prestamo.setCantidad(parseInt(prompt('Cuanto dinero quieres pedir prestado: ')))

const c1 = new Cuota(1)
const c3 = new Cuota(3)
const c6 = new Cuota(6)
const c9 = new Cuota(9)
const c12 = new Cuota(12)

prestamo.setCuotas(c1)
prestamo.setCuotas(c3)
prestamo.setCuotas(c6)
prestamo.setCuotas(c9)
prestamo.setCuotas(c12)
