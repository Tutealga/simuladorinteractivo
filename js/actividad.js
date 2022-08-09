let continuar;

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
}

//Clase prestamos
class Prestamo{
    constructor(id, monto, cuotas){
        this.id = id;
        this.monto = monto;
        this.cuotas = cuotas;
    }
}

//Obtengo el usuario actual
let usuarioActual = sessionStorage.getItem('usuario');
let ua = obtenerUsuarioActual(usuarioActual)

//Cargar actividades y calcular totales
cargarActividad(ua.actividades);

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

//Cargo la actividad del LocalStorage
function cargarActividad(actividades){
    for (const actividad of actividades) {
            actividadesInner(actividad);
    }
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
                       <div class="card-body cbp"><p class="card-text card-text-m0">Pagaste cuota de prestamo</p></div>
                       </div>
                       <div class="card-body cbp"><div style="float:right" class="col-md-4"><p class="card-text card-text-m0">$${Math.floor(actividad.monto)}</p><small class="card-text card-text-m0">${actividad.fecha}</small></div>
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