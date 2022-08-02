const usuarios = (localStorage.getItem('usuarios') === null ) ? [] : JSON.parse(localStorage.getItem('usuarios'));

class Usuarios{
    constructor(nombre, prestamos){
        this.nombre = nombre;
        this.prestamos = prestamos;
    }}

function existeUsuario(nombre){
    for(const usuario of usuarios){
        if(usuario.nombre === nombre ){
            return true;
        }
    }
    return false;
}

function obtenerUsuario(nombre){
    for(const usuario of usuarios){  
        if (usuario.nombre === nombre){
            return new Usuarios(usuario.nombre, usuario.prestamos);
        }
    }
    return {};
}

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

let botonIngreso = document.querySelector('#ingreso')                          
botonIngreso.onclick = () => {
             let nombre = document.querySelector("#id4").value.toUpperCase();
             obtenerUsuarioActual(nombre)
             sessionStorage.setItem('usuario', nombre)
             window.location.href='prestamos.html'
         }
