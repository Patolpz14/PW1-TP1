// js/views/recuperar.js
import { obtenerUsuariosRegistrados } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-recuperar');
    const inputEmail = document.getElementById('email-recuperar');
    const inputNuevaPass = document.getElementById('pass-nueva');
    const inputConfirmaPass = document.getElementById('pass-confirma');

    if (!formulario) return;

    // Referencias a los elementos de la lista de requisitos en el HTML
    const reqLongitud = document.getElementById('req-longitud');
    const reqEspecial = document.getElementById('req-especial');
    const reqMayuscula = document.getElementById('req-mayuscula');
    const reqCoinciden = document.getElementById('req-coinciden');

    // Función auxiliar para actualizar visualmente las viñetas en tiempo real
    function actualizarRequisito(elemento, cumple, texto) {
        if (!elemento) return;
        if (cumple) {
            elemento.textContent = `✓ ${texto}`;
            elemento.classList.remove('invalido');
            elemento.classList.add('valido');
        } else {
            elemento.textContent = `* ${texto}`;
            elemento.classList.remove('valido');
            elemento.classList.add('invalido');
        }
    }

    // Función principal de validación en tiempo real de la contraseña
    function validarRequisitosEnTiempoReal() {
        const passwordVal = inputNuevaPass ? inputNuevaPass.value : '';
        const repetirVal = inputConfirmaPass ? inputConfirmaPass.value : '';

        // 1. Longitud entre 8 y 15 caracteres
        const cumpleLongitud = passwordVal.length >= 8 && passwordVal.length <= 15;
        actualizarRequisito(reqLongitud, cumpleLongitud, "Entre 8 y 15 caracteres");

        // 2. Al menos un carácter especial
        const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(passwordVal);
        actualizarRequisito(reqEspecial, cumpleEspecial, "Al menos un carácter especial (!@#$%...)");

        // 3. Al menos una letra mayúscula
        const cumpleMayuscula = /[A-Z]/.test(passwordVal);
        actualizarRequisito(reqMayuscula, cumpleMayuscula, "Al menos una letra mayúscula");

        // 4. Ambas contraseñas coinciden
        const cumpleCoinciden = passwordVal !== '' && passwordVal === repetirVal;
        actualizarRequisito(reqCoinciden, cumpleCoinciden, "Ambas contraseñas coinciden");
    }

    // Escuchadores para el cambio de color en tiempo real al escribir
    if (inputNuevaPass) {
        inputNuevaPass.addEventListener('input', validarRequisitosEnTiempoReal);
    }
    if (inputConfirmaPass) {
        inputConfirmaPass.addEventListener('input', validarRequisitosEnTiempoReal);
    }

    // Manejo del formulario al hacer Submit
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const emailVal = inputEmail.value.trim();
        const nuevaPassVal = inputNuevaPass.value.trim();
        const confirmaPassVal = inputConfirmaPass.value.trim();

        // 1. Validación de campos vacíos
        if (!emailVal || !nuevaPassVal || !confirmaPassVal) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // 2. Validación estricta del correo (debe existir en los usuarios registrados)
        const usuarios = obtenerUsuariosRegistrados();
        const usuarioEncontrado = usuarios.find(user => user.email === emailVal);

        if (!usuarioEncontrado) {
            alert('El correo electrónico ingresado no se encuentra registrado en el sistema.');
            inputEmail.focus();
            return;
        }

        // 3. Evaluaciones de seguridad obligatorias antes de proceder
        const cumpleLongitud = nuevaPassVal.length >= 8 && nuevaPassVal.length <= 15;
        const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(nuevaPassVal);
        const cumpleMayuscula = /[A-Z]/.test(nuevaPassVal);
        const cumpleCoinciden = (nuevaPassVal === confirmaPassVal);

        if (!cumpleLongitud || !cumpleEspecial || !cumpleMayuscula || !cumpleCoinciden) {
            alert('Por favor, asegúrate de que la nueva contraseña cumpla con todos los requisitos de seguridad y coincida.');
            inputNuevaPass.focus();
            return;
        }

        // 4. Actualizar contraseña en el array de usuarios y guardar en localStorage
        usuarioEncontrado.password = nuevaPassVal;

        const index = usuarios.findIndex(user => user.email === emailVal);
        if (index !== -1) {
            usuarios[index] = usuarioEncontrado;
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

            // 5. Alerta solicitada y redirección limpia al login
            alert('Contraseña recuperada, será redirigido al inicio de usuario.');
            window.location.href = 'index.html';
        } else {
            alert('Ocurrió un error al actualizar la contraseña. Inténtalo de nuevo.');
        }
    });
});