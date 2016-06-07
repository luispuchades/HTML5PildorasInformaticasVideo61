/*global window */
/*global alert */
/*jslint browser: true, for:true */

//JavaScript Document

/**Curso: HMTL5 - Pildoras Informáticas - API File VIII
 * Origin: Capitulo61.html ==> Escribiendo archivos
 */

// "use strict";

//1. Definición de Objetos y Variables
var zonaDatos;
var botonAceptar;
var nombreArchivo;
var espacio;
var ruta;
var archivoOrigen;
var directorioDestino;
var textoArea;

//1.1 Extracción de elementos desde HTML
zonaDatos = document.getElementById("zona-datos");
botonAceptar = document.getElementById("boton-aceptar");
nombreArchivo = document.getElementById("entrada").value;
archivoOrigen = document.getElementById("archivo-origen");
textoArea = document.getElementById("texto-area").value;

function errores (error) {
    'use strict';

    alert("Ha habido un error" + error.code);
}

function crearSys(system) {
    'use strict';

    espacio = system.root;

}

function accesoEspacio() {
    'use strict';

//Indicamos que requerimos un espacio permanente (persistente)
    window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
    window.mozRequestFileSystem(PERSISTENT, 5*1024*1024, crearSys, errores);
}

function mostrarResultado(entrada) {
    'use strict';

    zonaDatos.innerHTML = "Archivo creado con éxito";


}

function exito() {
    'use strict';

// Reseteamos los campos de captura de texto y nombre del fichero
    document.getElementById("archivo-origen").value = "";
    document.getElementById("texto-area").value = "";

    mostrarResultado();
}


function escribirContenido(fileWriter) {
    'use strict';

    var blob;

/**
 * El objeto fileWriter desencadenado por el método createWriter
 * tiene el método writeend, que llamamos con "onwriteend" y
 * conseguimos que cuado se produzca la escritura del fichero
 * con filewriter y esta escritura haya finalizado, acción que
 * detectaremos con "onwriteend", entonces que llame a la
 * función exito()
 * Para poder almacenar el contenido, creamos un constructor
 *
 */
    fileWriter.onwriteend = exito();

/**
 * Creamos el constructor blob a partir de un nuevo objeto
 * de la clase Blob
 * El primer parámetro que le damos es un array del texto a insertar.
 * El segundo parámetro que le damos es el tipo de datos que es
 * el primer parámetro. En este caso ("text/html")
 */

    blob = new Blob([textoArea], {type: "text/html"});

/**
 * Escribimos el contenido de blob con el método fileWriter
 */

    fileWriter.write(blob);

}

function escribirArchivo() {
    'use strict';

    espacio.getFile
/**
 * Añadimos la ruta para poder eliminar el fichero desde
 * cualquier directorio
 */
    archivoOrigen = ruta + archivoOrigen;

        espacio.getFile(archivoOrigen, {create: true, exclusive: false}, function(archivo) {
            archivo.createWriter(escribirContenido, errores);}, errores);
        }
}


function comenzar() {
    'use strict';

    botonAceptar.addEventListener("click", escribirArchivo, false);


/**
 * Determinamos si el espacio debe ser temporal o permanente
 * Aun no es estandard y hay que usar prefijos de navegador (webkit, moz y ms)
 * Pedimos permiso al navegador para acceder a nuestro disco duro
 * Reservamos con requestQuota 5MB = (5 * 1024 bits/KB *...
 * ... * 1024 KB/MB)
 */

    navigator.webkitPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
    navigator.mozPersistentStorage.requestQuota(5*1024*1024, accesoEspacio)
}




//3. Asignación de Eventos
document.addEventListener("DOMContentLoaded", comenzar, false);
