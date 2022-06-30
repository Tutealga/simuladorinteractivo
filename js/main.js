let botonPrestamo = document.querySelector('#boton1')                          
botonPrestamo.onclick = () => {
            let usuario = document.querySelector("#id1").value;
            let monto = parseInt(document.querySelector("#id2").value);
            let cuantasCuotas = parseInt(document.querySelector("#id3").value);

            const cuotas = [1,2,3,4,5,6,7,8,9,10,11,12]

            const existe = cuotas.find((cuota) => {
                return cuota === cuantasCuotas
                })

            const nuevoUsuario = new Usuario(usuario, monto, existe)
            const prestamo = new Prestamo(monto, existe, nuevoUsuario)

            prestamo.calcular(monto, existe, nuevoUsuario, prestamo)
            }   

class Prestamo{
    constructor(monto, cuotas, usuario){
        this.monto = monto;
        this.cuotas = cuotas; 
        this.usuario = usuario;
    }
    calcular(monto, cuotas, usuario, prestamo){
        let resultado = (monto + (monto * cuotas * 0.12)) / cuotas
        let total = monto + (monto * cuotas * 0.12)
        return prestamo.mostrarInfo(resultado, total, usuario)
    }
    mostrarInfo(resultado, total, usuario){
        let usuarioDebe = document.querySelector('.card')
        usuarioDebe.innerHTML = `<div class="card-body">
                                  <h5 class="card-title">${usuario.nombre}</h5>
                                  <p id="total" class="card-text">Debe: $${total}</p>
                                  <p id="cuotas" class="card-text">Cuotas: ${this.cuotas} de $${resultado}</p>
                                  <button type="button" id="pagar" class="btn btn-primary">Pagar</button>
                                  </div>`

        let boton = document.querySelector('#pagar')                          
        boton.onclick = () => {
            let totalDescontado = document.querySelector('#total')
            let cuotasDescontadas = document.querySelector('#cuotas')
            if (this.cuotas > 0 && this.cuotas < 12){
             totalDescontado.innerHTML = `<p id="total" class="card-text">Debe: $${total -= resultado}</p>`
             cuotasDescontadas.innerHTML = `<p id="cuotas" class="card-text">Cuotas: ${this.cuotas -= 1} de $${resultado}</p>`
             alert('Cuota pagada')
             while(this.cuotas <= 0){
                let resultadoFinal = document.querySelector('#cuotas')
                resultadoFinal.innerHTML = `<p id="cuotas" class="card-text">Cuotas: ${this.cuotas} de $0</p>`
                break
            }
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
