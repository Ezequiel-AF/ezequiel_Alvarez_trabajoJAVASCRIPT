const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');

function validarNombre() {
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,15}$/;
    if (nombre.length >= 3 && nombrePattern.test(nombre)) {
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('error-nombre').textContent = '';
    } else {
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('error-nombre').textContent = 'El nombre debe tener letras, mínimo 3 y máximo 15 caracteres.';
    }
}

function validarApellidos() {
    const apellido = apellidosInput.value;
    const apellidoPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,40}$/;
    if (apellido.length >= 2 && apellidoPattern.test(apellido)) {
        apellidosInput.classList.add('valido');
        apellidosInput.classList.remove('invalido');
        document.getElementById('error-apellidos').textContent = '';
    } else {
        apellidosInput.classList.add('invalido');
        apellidosInput.classList.remove('valido');
        document.getElementById('error-apellidos').textContent = 'El apellido debe tener letras y al menos 2 caracteres.';
    }
}

function validarTelefono() {
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;
    if (telefonoPattern.test(telefono)) {
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('error-telefono').textContent = '';
    } else {
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('error-telefono').textContent = 'El número de teléfono debe tener 9 dígitos y contener solo números.';
    }
}

function validarEmail() {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('error-email').textContent = '';
    } else {
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('error-email').textContent = 'Debe introducir un email válido.';
    }
}

nombreInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellidos);
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);

// Función para calcular el presupuesto
function calcularPresupuesto() {
    let producto = parseFloat(document.getElementById("producto").value);
    let plazo = parseInt(document.getElementById("plazo").value);
    let extras = document.querySelectorAll(".extra:checked");
    let descuento = 0;
    let totalExtras = 0;

    // Sumar extras seleccionados
    extras.forEach(extra => totalExtras += parseFloat(extra.value));

    let totalSinDescuento = producto + totalExtras;

    // Aplicar descuentos según el plazo
    if (plazo > 6) {
        descuento = totalSinDescuento * 0.10; // 10% de descuento
    } else if (plazo <= 6) {
        descuento = totalSinDescuento * 0.05; // 5% de descuento
    }

    let totalFinal = totalSinDescuento - descuento;

    // Actualizar en pantalla
    document.getElementById("totalBase").textContent = totalSinDescuento.toFixed(2) + "€";
    document.getElementById("descuento").textContent = descuento.toFixed(2) + "€";
    document.getElementById("total").textContent = "Total final: " + totalFinal.toFixed(2) + "€";
}

// Agregar eventos para actualizar el presupuesto dinámicamente
document.getElementById("producto").addEventListener("change", calcularPresupuesto);
document.getElementById("plazo").addEventListener("input", calcularPresupuesto);
document.querySelectorAll(".extra").forEach(extra => extra.addEventListener("change", calcularPresupuesto));

// Habilitar botón de enviar solo si se aceptan las condiciones
document.getElementById("condiciones").addEventListener("change", function() {
    document.getElementById("enviar").disabled = !this.checked;
});

// Función para validar todos los campos antes de enviar
function validarFormulario() {
    // Validar los campos
    validarNombre();
    validarApellidos();
    validarTelefono();
    validarEmail();

    // Verificar si todos los campos son válidos
    const nombreValido = document.getElementById("nombre").classList.contains('valido');
    const apellidosValido = document.getElementById("apellidos").classList.contains('valido');
    const telefonoValido = document.getElementById("telefono").classList.contains('valido');
    const emailValido = document.getElementById("email").classList.contains('valido');
    const productoValido = document.getElementById("producto").value !== "0"; // Verificar que se haya seleccionado un producto
    const condicionesAceptadas = document.getElementById("condiciones").checked; // Verificar que se haya aceptado las condiciones

    // Verificar si todos los campos son válidos y si se han aceptado las condiciones
    if (nombreValido && apellidosValido && telefonoValido && emailValido && productoValido && condicionesAceptadas) {
        // Si todo está bien, mostrar mensaje de éxito
        alert("Presupuesto solicitado correctamente");
        return true; // Permitir el envío del formulario 
    } else {
        // Si hay algún error, mostrar mensaje de error y no enviar el formulario
        alert("Por favor, complete correctamente todos los campos del formulario.");
        return false; // No permitir el envío del formulario
    }
}

// Agregar el evento de click en el botón "Enviar"
document.getElementById("enviar").addEventListener("click", function(e) {
    // Evitar el comportamiento por defecto del botón si el formulario no es válido
    if (!validarFormulario()) {
        e.preventDefault(); // Esto evita que el formulario se envíe
    }
});

// Resetear formulario
document.getElementById("reset").addEventListener("click", function() {
    // Resetear campos de entrada
    document.getElementById("nombre").value = '';
    document.getElementById("apellidos").value = '';
    document.getElementById("telefono").value = '';
    document.getElementById("email").value = '';

    // Eliminar clases de valido e invalido
    document.getElementById("nombre").classList.remove('valido', 'invalido');
    document.getElementById("apellidos").classList.remove('valido', 'invalido');
    document.getElementById("telefono").classList.remove('valido', 'invalido');
    document.getElementById("email").classList.remove('valido', 'invalido');

    // Desmarcar checkboxes de extras
    document.querySelectorAll(".extra").forEach(extra => extra.checked = false);

    // Resetear el valor del producto a "Elija un producto"
    document.getElementById("producto").value = "0";

    // Resetear el valor del plazo de entrega a 1
    document.getElementById("plazo").value = "1";

    // Resetear precios
    document.getElementById("totalBase").textContent = "0€";
    document.getElementById("descuento").textContent = "0€";
    document.getElementById("total").textContent = "Total final: 0€";

    // Deshabilitar el botón de enviar
    document.getElementById("enviar").disabled = true;

    // Ocultar mensajes de error
    document.querySelectorAll(".error").forEach(error => error.style.display = "none");

    // Resetear el checkbox de condiciones
    document.getElementById("condiciones").checked = false;
});