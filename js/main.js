let usuario = prompt('Como es tu nombre: ')
let monto = parseInt(prompt('Cuanto dinero queres pedir prestado: '))
let cuantasCuotas = parseInt(prompt('En cuantas cuotas queres devolver el prestamo (min: 1 - max: 12): '))

const cuotas = [1,2,3,4,5,6,7,8,9,10,11,12]

const existe = cuotas.find((cuota) => {
    return cuota === cuantasCuotas
 })

class Prestamo{
    constructor(monto, cuotas, usuario){
        this.monto = monto;
        this.cuotas = cuotas; 
        this.usuario = usuario;
    }
    calcular(monto, cuotas, usuario){
        let resultado = (monto + (monto * cuotas * 0.12)) / cuotas
        let total = monto + (monto * cuotas * 0.12)
        return prestamo.mostrarInfo(resultado, total, usuario)
    }
    mostrarInfo(resultado, total, usuario){
        //alert(usuario.nombre + ' tendras que devolver ' + this.cuotas + ' cuotas de ' + resultado)
        //alert(usuario.nombre + ' en total devolveras ' + total)
        let usuarioDebe = document.querySelector('.card')
        usuarioDebe.innerHTML = `<div class="card-body">
                                  <h5 class="card-title">${usuario.nombre}</h5>
                                  <p class="card-text">Debe: $${total}</p>
                                  <p id="cuotas" class="card-text">Cuotas: ${this.cuotas} de $${resultado}</p>
                                  <button type="button" class="btn btn-primary">Pagar</button>
                                  </div>`

        let boton = document.querySelector('.btn-primary')                          
        boton.onclick = () => {
            let cuotasDescontadas = document.querySelector('#cuotas')
            if (this.cuotas > 0 && this.cuotas < 12){
             cuotasDescontadas.innerHTML = `<p id="cuotas" class="card-text">Cuotas: ${this.cuotas -= 1} de $${resultado}</p>`
             alert('Cuota pagada')
            }else{
              alert('Ya no hay cuotas por pagar')
            }
        }
    }
       
}

class Usuario{
    constructor(nombre, prestamos, cuotas){
        this.nombre = nombre;
        this.prestamos = prestamos;
        this.cuotas = cuotas;
    }
}

const nuevoUsuario = new Usuario(usuario, monto, existe)

const prestamo = new Prestamo(monto, existe, nuevoUsuario)
prestamo.calcular(monto, existe, nuevoUsuario)

