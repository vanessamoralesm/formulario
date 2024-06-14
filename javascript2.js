var alumnos = new Array(); // Colección de objetos JSON
var posicion_actual = -1;
var coincidenciasBusqueda = []; // Array para almacenar las coincidencias de búsqueda
var posicion_actual_busqueda = -1; // Posición actual en las coincidencias de búsqueda

var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var carrera = document.getElementById("opciones");
var rbsexo1 = document.getElementById("sexo1");
var rbsexo2 = document.getElementById("sexo2");
var egresado = document.getElementById("egresado");
var filtro = document.getElementById("filtro"); // Campo de filtro

desHabilitarControles();

function nuevo() {
    LimpiarControles();
    habilitarControles();

    // Botones
    document.getElementById("bo_nuevo").disabled = true;
    document.getElementById("bo_guardar").disabled = false;
    document.getElementById("bo_cancelar").disabled = false;
    document.getElementById("bo_eliminar").disabled = true;
    
}

function guardar() {
    let nuevoalumno = {
        "nombre": nombre.value,
        "apellido": apellido.value,
        "carrera": carrera.options[carrera.selectedIndex].text,
        "rbsexo1": rbsexo1.checked,
        "rbsexo2": rbsexo2.checked,
        "egresado": egresado.checked,
    };

    alumnos.push(nuevoalumno);
    let valorSeleccionado = nuevoalumno.carrera.toLowerCase(); // Guardar el valor seleccionado
    cancelar();

    // Restablecer la selección del select
    for (let i = 0; i < carrera.options.length; i++) {
        if (carrera.options[i].text.toLowerCase() === valorSeleccionado) {
            carrera.selectedIndex = i;
            break;
        }
    }

    alert("Registro guardado con éxito");
    return false;
}


function cancelar() {
    desHabilitarControles();
    irAlUltimo();

    // Botones
    document.getElementById("bo_nuevo").disabled = false;
    document.getElementById("bo_guardar").disabled = true;
    document.getElementById("bo_cancelar").disabled = true;
    document.getElementById("bo_eliminar").disabled = false;
}

function irAlPrimero() {
    if (coincidenciasBusqueda.length > 0) {
        posicion_actual_busqueda = 0;
        MostrarRegistro(coincidenciasBusqueda[0]);
    } else {
        posicion_actual = 0;
        MostrarRegistro(posicion_actual);
    }
}

function irAlUltimo() {
    if (coincidenciasBusqueda.length > 0) {
        posicion_actual_busqueda = coincidenciasBusqueda.length - 1;
        MostrarRegistro(coincidenciasBusqueda[posicion_actual_busqueda]);
    } else {
        posicion_actual = alumnos.length - 1;
        MostrarRegistro(posicion_actual);
    }
}

function retroceder() {
    if (coincidenciasBusqueda.length > 0) {
        if (posicion_actual_busqueda > 0) {
            posicion_actual_busqueda--;
            MostrarRegistro(coincidenciasBusqueda[posicion_actual_busqueda]);
        }
    } else if (posicion_actual > 0) {
        posicion_actual--;
        MostrarRegistro(posicion_actual);
    }
}

function avanzar() {
    if (coincidenciasBusqueda.length > 0) {
        if (posicion_actual_busqueda < coincidenciasBusqueda.length - 1) {
            posicion_actual_busqueda++;
            MostrarRegistro(coincidenciasBusqueda[posicion_actual_busqueda]);
        }
    } else if (posicion_actual < alumnos.length - 1) {
        posicion_actual++;
        MostrarRegistro(posicion_actual);
    }
}

function MostrarRegistro(ind) {
    nombre.value = alumnos[ind].nombre;
    apellido.value = alumnos[ind].apellido;
    var valorCarrera = alumnos[ind].carrera;

    // Itera a través de las opciones del elemento "carrera" y selecciona la correspondiente
    for (var i = 0; i < carrera.options.length; i++) {
        if (carrera.options[i].text.toLowerCase() === valorCarrera.toLowerCase()) {
            carrera.selectedIndex = i;
            break;
        }
    }

    rbsexo1.checked = alumnos[ind].rbsexo1;
    rbsexo2.checked = alumnos[ind].rbsexo2;
    egresado.checked = alumnos[ind].egresado;
}


function LimpiarControles() {
    nombre.value = "";
    apellido.value = "";
    carrera.value = ""; // Limpiamos la selección de la carrera
    rbsexo1.checked = false;
    rbsexo2.checked = false;
    egresado.checked = false;
}

function desHabilitarControles() {
    nombre.disabled = true;
    apellido.disabled = true;
    carrera.disabled = true;
    rbsexo1.disabled = true;
    rbsexo2.disabled = true;
    egresado.disabled = true;
}

function habilitarControles() {
    nombre.disabled = false;
    apellido.disabled = false;
    carrera.disabled = false;
    rbsexo1.disabled = false;
    rbsexo2.disabled = false;
    egresado.disabled = false;
}

function eliminar() {
    if (alumnos.length == 1) {
        // Si solo hay un elemento en la lista, borra los valores de todas las casillas.
        LimpiarControles();
    }

    if (posicion_actual >= 0) {
        alumnos.splice(posicion_actual, 1);
        if (posicion_actual >= alumnos.length) {
            posicion_actual = alumnos.length - 1;
        }
        MostrarRegistro(posicion_actual);
    }
}

function busqueda() {
    var filtroTexto = filtro.value.toLowerCase();
    coincidenciasBusqueda = [];

    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        var textoAlumno = alumno.nombre.toLowerCase() + " " + alumno.apellido.toLowerCase() + " " + alumno.carrera.toLowerCase();

        if (textoAlumno.includes(filtroTexto)) {
            coincidenciasBusqueda.push(i);
        }
    }

    if (coincidenciasBusqueda.length === 0) {
        alert("No se encontraron registros que coincidan con el valor de búsqueda.");
        desHabilitarNavegacion(); // Deshabilitar la navegación si no hay coincidencias
    } else {
        posicion_actual_busqueda = 0;
        MostrarRegistro(coincidenciasBusqueda[0]);
    }
}


function desHabilitarNavegacion() {
    document.getElementById("irAlPrimero").disabled = true;
    document.getElementById("retroceder").disabled = true;
    document.getElementById("avanzar").disabled = true;
    document.getElementById("irAlUltimo").disabled = true;
}




