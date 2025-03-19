// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar los nombres
let amigos = [];

// Función para agregar un nombre
function agregarAmigo() {
    const input = document.getElementById('amigo');
    // Dividir el input por comas, eliminar espacios en blanco y filtrar nombres vacíos
    const listaDeNombres = input.value.split(',').map(n => n.trim()).filter(n => n !== '');
    
    // Validar si no se ingresó nada
    if (listaDeNombres.length === 0) {
        alert('Por favor, ingresa al menos un nombre válido.');
        return;
    }
    
    // Expresión regular para validar que solo contenga letras, espacios y caracteres especiales válidos
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    // Recorrer cada nombre del arreglo
    listaDeNombres.forEach(n => { // Cambié "nombre" por "n" para evitar conflictos
        // Normalizar el nombre a "Primera letra en mayúscula"
        const nombreNormalizado = capitalizar(n);

        // Validar longitud mínima
        if (n.length < 2) { 
            alert(`El nombre "${n}" es demasiado corto. Debe tener al menos 2 letras.`); 
            return;
        }
        
        // Validar letras y evitar duplicados
        if (soloLetras.test(n) && !amigos.includes(n)) {
            amigos.push(n);

            const listaAmigos = document.getElementById('listaAmigos');
            const li = document.createElement('li');
            li.textContent = nombreNormalizado; // Mostrar el nombre en la lista del DOM
            
            // Crear un botón para borrar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'x';
            botonEliminar.className = 'delete-button';
            botonEliminar.onclick = () => borrarAmigo(n, li);
            
            li.appendChild(botonEliminar); // Añadir el botón al elemento de la lista
            listaAmigos.appendChild(li);
            // Actualizar visibilidad del botón "Borrar todos"
            actualizarBotonBorrar();
        // Mostrar alerta si el nombre contiene caracteres no válidos o ya está en la lista
        } else if (!soloLetras.test(n)) {
            alert(`El nombre "${n}" contiene caracteres no permitidos.`);
        } else if (amigos.includes(n)) {
            alert(`El nombre "${n}" ya está en la lista.`);
        }
    });

    input.value = ''; // Limpiar el campo de entrada
}

function capitalizar(n) {
    if (n && typeof n === 'string') {
        return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
    }
    return ''; // Devuelve una cadena vacía en caso de que el argumento no sea válido
}

// Función para sortear amigos
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('No hay participantes en la lista. Agrega al menos un amigo para sortear.');
        return;
    }

    // Seleccionar un índice aleatorio de la lista
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSeleccionado = amigos[indiceAleatorio];

    // Mostrar el amigo seleccionado en el área de resultados
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li><strong>${amigoSeleccionado}</strong> es el seleccionado!</li>`;
}

function borrarAmigo(nombre, elementoLi) {
    // Eliminar el nombre del arreglo
    amigos = amigos.filter(amigo => amigo !== nombre);

    // Eliminar el elemento de la lista del DOM
    elementoLi.remove();
    // Actualizar visibilidad del botón "Borrar todos"
    actualizarBotonBorrar();
}

function borrarTodos() {
    amigos = []; // Vaciar el arreglo
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Vaciar el contenido del DOM
    // Actualizar visibilidad del botón "Borrar todos"
    actualizarBotonBorrar();
}

function actualizarBotonBorrar() {
    const listaAmigos = document.getElementById('listaAmigos');
    const botonBorrar = document.querySelector('.button-clear');

    // Mostrar el botón si hay al menos un elemento, ocultarlo si no
    if (listaAmigos.children.length > 0) {
        botonBorrar.style.display = 'block';
    } else {
        botonBorrar.style.display = 'none';
    }
}
