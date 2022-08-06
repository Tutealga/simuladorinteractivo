const usuarios = (localStorage.getItem('usuarios') === null ) ? [] : JSON.parse(localStorage.getItem('usuarios'));

//Clase usuarios
class Usuarios{
    constructor(nombre, prestamos){
        this.nombre = nombre;
        this.prestamos = prestamos;
    }}

//Verifico si existe el usuario
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
            return new Usuarios(usuario.nombre, usuario.prestamos);
        }
    }
    return {};
}

//Si el usuario existe lo devuelvo, sino creo uno nuevo
function obtenerUsuarioActual(nombre){
    if (existeUsuario(nombre)){
        return obtenerUsuario(nombre);
    } else {
        const usuarioActual = new Usuarios(nombre, []);
        usuarios.push(usuarioActual);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return usuarioActual;
    } 
}

//Obtengo el usuario ingresado por el dom
let botonIngreso = document.querySelector('#ingreso')                          
botonIngreso.onclick = () => {
             let nombre = document.querySelector("#id4").value.toUpperCase();
             obtenerUsuarioActual(nombre)
             sessionStorage.setItem('usuario', nombre)
             window.location.href='prestamos.html'
         }
