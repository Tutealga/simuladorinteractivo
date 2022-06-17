let cantidad = prompt('Cuanto dinero quieres pedir prestado: ')
let cuotas = prompt('En cuantas cuotas quieres devolverlo: ')


switch(cuotas) {
    case 1:
        
        break
    case 3:
        break
    case 6:
        break
    case 9:
        break
    case 12:
        break
    default:
        cuotas = prompt('En cuantas cuotas quieres devolverlo: ')
}

if (cuotas <= 12){
   cuantasCuotas(monto, cuotas)
}else{
    while (cuotas > 12){
        cuotas = prompt('Ingrese correctamente las cuotas: ')
    }
    cuantasCuotas(monto, cuotas)
}

//class User{
//    constructor(nombre, edad){
//        this.nombre = nombre;
//        this.edad = edad;
//    }
//}

class Prestamo{
    constructor(){
        this.usuario = '';
        this.cantidad = cantidad;
        this.cuotas = cuotas; 
    }
    setUsuario(value) { this.usuario = value }
    devolucionCuotas(){
        alert('Tendras que devolver ' + cuotas + ' cuotas de ' + cantidad/cuotas)
        for (i = cantidad; i > 0; i -= cantidad/cuotas){
            alert('Falta por pagar: ' + i)
        }
    }
}

