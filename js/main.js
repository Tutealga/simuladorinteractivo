let continuar;

//Obtengo el boton de cuotas seleccionado
let buttons = document.getElementsByClassName("check");
function check(btn){
    for (let i=0; i < buttons.length; i++){
        buttons[i].className = "noelegido check"
        if (i == btn){
            buttons[btn].className = "elegido check"
        }
    }
    let monto = parseInt(document.querySelector("#id2").value);
    let devolves = document.querySelector(".devolves");
    let cuantasCuotas = document.querySelector(".elegido").value;
    devolves.innerText = totalConIntereses(monto, cuantasCuotas)
}

const usuarios = (localStorage.getItem('usuarios') === null ) ? [] : JSON.parse(localStorage.getItem('usuarios'));
const DateTime = luxon.DateTime
const date = DateTime.now()

//Clase usuarios
class Usuarios{
    constructor(nombre, prestamos, actividades){
        this.nombre = nombre;
        this.prestamos = prestamos;
        this.actividades = actividades;
    }
    obtenerPrestamos(){
        return this.prestamos
    }
    calcularBalance(){
        const prestamos = this.obtenerPrestamos();
        const totalPrestamos = calcularTotal(prestamos);
        return totalPrestamos
    }
}

//Clase prestamos
class Prestamo{
    constructor(id, monto, cuotas){
        this.id = id;
        this.monto = monto;
        this.cuotas = cuotas;
    }
setMonto(monto){
    this.monto = monto;
}
setCuotas(cuotas){
    this.cuotas = cuotas;
}
}

//Obtengo el usuario actual
let usuarioActual = sessionStorage.getItem('usuario');
let ua = obtenerUsuarioActual(usuarioActual)

//Cargar prestamos/actividades y calcular totales
cargarPrestamos(ua.prestamos);
cargarActividad(ua.actividades);
calcularTotales();

//Calcular el total con intereses a abonar
function totalConIntereses(monto, cuotas){
    let total = monto + (monto * cuotas * 0.12)
    return total
}

//Calcular cuanto es por cuota
function totalEnCuotas(monto, cuotas){
    let resultado = monto / cuotas
    return resultado
}

//Verifico que exista el usuario
function existeUsuario(nombre){
    for(const usuario of usuarios){
        if(usuario.nombre === nombre ){
            return true;
        }
    }
    return false;
}

//Obtengo el usuario
function obtenerUsuario(nombre){
    for(const usuario of usuarios){  
        if (usuario.nombre === nombre){
            return new Usuarios(usuario.nombre, usuario.prestamos, usuario.actividades);
        }
    }
    return {};
}

//Obtengo el id del usuario
function obtenerIDUsuario(nombre){
    for(let i = 0; i < usuarios.length; i++){  
        if (usuarios[i].nombre === nombre){
            return i;
        }
    }
    return -1;
}

//Si el usuario ingresado existe lo retorno, sino creo uno nuevo
function obtenerUsuarioActual(nombre){
    if (existeUsuario(nombre)){
        return obtenerUsuario(nombre);
    } else {
        const usuarioActual = new Usuarios(nombre, [], []);
        usuarios.push(usuarioActual);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return usuarioActual;
    } 
}

//Para cargar y crear los prestamos en el DOM
function prestamosInner(prestamo){
    let cards = document.createElement("div");
    let {id, monto, cuotas} = prestamo;
    cards.className = "card pCard";
    cards.innerHTML = `<div class="card-body">
                       <h5 class="card-title" style="display:inline">Prestamo ${id}</h5>
                       <p id="total" class="card-text">Debes: $${Math.floor(monto)}</p>
                       <p id="cuotas" class="card-text">Cuotas: ${cuotas} de $${Math.floor(totalEnCuotas(monto, cuotas))}</p>
                       <button type="button" onclick="pagarCuota(${id})" class="btn text-light bg-danger">Pagar cuota</button>
                       </div>`;
    let divCards = document.querySelector(".divCards");
    divCards.appendChild(cards);
}

//Cargo los prestamos registrados en el LocalStorage
function cargarPrestamos(prestamos){
    for (const prestamo of prestamos) {
            prestamosInner(prestamo);
    }
}

//Cargo la actividad del LocalStorage
function cargarActividad(actividades){
    for (const actividad of actividades) {
            actividadesInner(actividad);
    }
}
 
//Al dar el boton se carga el nuevo prestamo
let botonPrestamo = document.querySelector('#boton1')                          
botonPrestamo.onclick = () => {
        validarSeleccionCuotas();
        if (continuar){
            let monto = parseInt(document.querySelector("#id2").value);
            let cuantasCuotas = document.querySelector(".elegido").value;
            validarPrestamo(monto)
            if(continuar){
                ua.prestamos.push(new Prestamo((ua?.prestamos[(ua?.prestamos?.length-1 || 0)]?.id+1 || 1), totalConIntereses(monto, cuantasCuotas), cuantasCuotas));
                agregarPrestamo();
                calcularTotales();
                actualizarUsuario(); 
            }   
        }
        limpiarModalPrestamos(); 
        }

//Agregar el nuevo prestamo
function agregarPrestamo(){
    const prestamo = ua.prestamos[ua.prestamos.length-1];
    prestamosInner(prestamo);
}

//Calcular el balance total de los prestamos
function calcularTotal(prestamos){
    let total = 0;
    prestamos.forEach((prestamo) =>{
        total = total + prestamo.monto;
    });
    return total;
}

//Mostrar el balance total de los prestamos y cuantos son
function calcularTotales(){
    let totalPrestamos = document.getElementById("totalPrestamos");
    let cantidadPrestamos = document.getElementById("cantidadPrestamos");
    cantidadPrestamos.innerText = ua?.prestamos?.length || 0;
    const prestamos = (ua?.obtenerPrestamos() || []);
    totalPrestamos.innerText = Math.floor(calcularTotal(prestamos)).toLocaleString("es-AR", {style: "currency",currency: "ARS"});
    ua.calcularBalance();
}

//Verificar que se haya ingresado el monto
function validarPrestamo(monto){
    if((Number.isInteger(monto) && monto !== 0)){
        continuar = true;
    } else {
        alert("Debes ingresar un monto y cuotas correctos")
        continuar = false;
    }
}

//Verificar que se haya seleccionado las cuotas
function validarSeleccionCuotas(){
    if (document.querySelector(".elegido")){
        continuar = true;
    } else {
        alert("Debes ingresar un monto y cuotas correctos")
        continuar = false;
    }
}

//Al confirmar el nuevo prestamo limpiar el modal
function limpiarModalPrestamos(){
    document.querySelector("#id2").value = "";
    let cuantasCuotas = document.querySelector(".elegido");
    cuantasCuotas.className = "noelegido check"
}

//Al un prestamo quedar en 0 y ser eliminado actualizo el indice de los demas prestamos
function actualizarPrestamos(){
    for(let i=0; i < ua.prestamos.length; i++){
        if (ua.prestamos[i].id !== (i+1)){
            ua.prestamos[i].id = i+1;
        }
    }
}

//Funcion para el pago de cuotas
function pagarCuota(id){
    id = id-1
    const prestamo = new Prestamo(ua?.prestamos[id]?.id, ua?.prestamos[id]?.monto, ua?.prestamos[id]?.cuotas);
    if(prestamo.monto > 0 && prestamo.cuotas > 0){
            Swal.fire({
                    title: 'Pago de cuotas',
                    text: "¿Confirmar pago de cuota?",
                    icon: 'warning',
                    closeOnClickOutside: true,
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar',
                    confirmButtonColor: "#198754",
                    cancelButtonColor: "#dc3545",
                     }).then((result) =>{
                     if(result.isConfirmed){
                        agregarActividad(id+1, totalEnCuotas(prestamo.monto, prestamo.cuotas), date.toLocaleString({ month: 'long', day: 'numeric' }));
                        prestamo.setMonto(prestamo.monto - totalEnCuotas(prestamo.monto, prestamo.cuotas));
                        prestamo.setCuotas(prestamo.cuotas - 1);
                        ua.prestamos[id] = prestamo
                        actualizarUsuario();
                        calcularTotales();
                       if(prestamo.cuotas <= 0 && prestamo.monto <= 0){
                        ua.prestamos.splice(id,1);
                        actualizarPrestamos();
                        actualizarUsuario();     
                        calcularTotales();
                        Swal.fire({
                                    title: 'Cuota pagada',
                                    text: '¡Ya no hay cuotas por pagar!',
                                    icon: 'success',
                                    confirmButtonColor: "#198754",
                                    confirmButtonText: 'Aceptar',
                                }).then(()=>{
                                    window.location.reload()
                                }) 
                    }else{
                        Swal.fire({
                            title: 'Cuota pagada',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: "#198754",
                        }).then(()=>{
                            window.location.reload()
                        }) 
                    }
                }
            })
        }
    }

function agregarActividad(id, monto, fecha){
    const actividad = {prestamo: id, monto: monto, fecha: fecha}
    ua.actividades.push(actividad);
    actualizarUsuario();
    actividadesInner(actividad);
}

function actividadesInner(actividad){
    let cards = document.createElement("div");
    cards.className = "card aCard";
    cards.innerHTML = `<div class="row align-items-center no-gutters">
    <div class="cardDiv--Img">
                    <div class="divActividad"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                       <div class="col-md-8">
                       <div class="card-body cbp"><p class="card-text card-text-m0">Pagaste cuota</p></div>
                       </div>
                       <div class="card-body cbp"><div class="w-100"><p class="card-text card-text-m0">$${Math.floor(actividad.monto)}</p><small class="card-text">${actividad.fecha}</small></div>
                       </div>
                       </div>
                       </div>`;
    let divCards = document.querySelector(".divCardsActividad");
    divCards.appendChild(cards);
}

//Actualizar el usuario en el LocalStorage    
function actualizarUsuario(){
    if(obtenerIDUsuario(usuarioActual) !== -1){
        usuarios[obtenerIDUsuario(usuarioActual)] = ua;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } 
}
    
        
      




