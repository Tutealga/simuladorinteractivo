const DateTime = luxon.DateTime

let botonPrestamo = document.querySelector('#boton1')                          
botonPrestamo.onclick = () => {
            let usuario1 = document.querySelector("#id1").value;
            localStorage.setItem('usuario',usuario1);
            let usuario = localStorage.getItem('usuario');

            let monto1 = parseInt(document.querySelector("#id2").value);
            localStorage.setItem('monto',monto1);
            let monto = parseInt(localStorage.getItem('monto'));

            let cuantasCuotas1 = parseInt(document.querySelector("#id3").value);
            localStorage.setItem('cuantasCuotas', cuantasCuotas1);
            let cuantasCuotas = parseInt(localStorage.getItem('cuantasCuotas'));

            const existe = cuotas.find((cuota) => {
                    return cuota === cuantasCuotas
                })
            
            const nuevoUsuario = new Usuario(usuario, monto, existe)
            const prestamo = new Prestamo(monto, existe, nuevoUsuario)
                        
            prestamo.calcular(monto, existe, nuevoUsuario, prestamo)
        }

let botonNuevoPrestamo = document.querySelector('#boton2')                          
botonNuevoPrestamo.onclick = () => {
            localStorage.clear()
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
        return prestamo.mostrarInfo(resultado, total, usuario, prestamo)
    }
    mostrarInfo(resultado, total, usuario){
        const fecha = DateTime.now();
        let usuarioDebe = document.querySelector('.card')
        usuarioDebe.innerHTML = `<div class="card-body">
        <h5 class="card-title" style="display:inline">${usuario.nombre}</h5><small style="float:right">${fecha.toLocaleString()}</small>
                                  <p id="total" class="card-text">Debe: $${total}</p>
                                  <p id="cuotas" class="card-text">Cuotas: ${this.cuotas} de $${resultado}</p>
                                  <button type="button" id="pagar" class="btn bg-danger">Pagar</button>
                                  </div>`
        let boton = document.querySelector('#pagar')                          
        boton.onclick = () => {
            while(this.cuotas <= 0){
                let resultadoFinal = document.querySelector('#cuotas')
                resultadoFinal.innerHTML = `<p id="cuotas" class="card-text">Cuotas: ${this.cuotas} de $0</p>`
                Toastify({
                    text: "Ya no hay cuotas por pagar",
                    duration: 2000,
                    gravity: 'bottom',
                    position: 'center',
                    style:{
                        background: 'yellow',
                        color: 'black'
                    }
                 }).showToast();   
                break
            }
            if (this.cuotas > 0 && this.cuotas < 12){
                let totalDescontado = document.querySelector('#total')
                let cuotasDescontadas = document.querySelector('#cuotas')
                Toastify({
                text: "Confirmar pago de cuota",
                duration: 1500,
                gravity: 'bottom',
                position: 'center',
                onClick: () => {
                    Toastify({
                        text: "Cuota pagada",
                        duration: 750,
                        gravity: 'top',
                        position: 'right',
                        style:{
                            background: 'green',
                        }
                     }).showToast();
                    totalDescontado.innerHTML = `<p id="total" class="card-text">Debe: $${total -= resultado}</p>`
                    cuotasDescontadas.innerHTML = `<p id="cuotas" class="card-text">Cuotas: ${this.cuotas -= 1} de $${resultado}</p>`
                     },
                style:{
                    background: 'red'
                }
             }).showToast();

            }}}}

class Usuario{
    constructor(nombre, prestamos, cuotas){
        this.nombre = nombre;
        this.prestamos = prestamos;
        this.cuotas = cuotas;
    }}
    
let usuario = localStorage.getItem('usuario');
let monto = parseInt(localStorage.getItem('monto'));
let cuantasCuotas = parseInt(localStorage.getItem('cuantasCuotas'));

const cuotas = [1,2,3,4,5,6,7,8,9,10,11,12]

const existe = cuotas.find((cuota) => {
        return cuota === cuantasCuotas
    })

const nuevoUsuario = new Usuario(usuario, monto, existe)
const prestamo = new Prestamo(monto, existe, nuevoUsuario)

if(usuario && monto && existe){
    prestamo.calcular(monto, existe, nuevoUsuario, prestamo)
}


