// js/registro.js
import { obtenerUsuariosRegistrados, registrarUsuario, guardarUsuarioActivo } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario-registro');
    const inputNombre = document.getElementById('nombre');
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');
    const inputRepetirPassword = document.getElementById('repetir-password');

    // Referencias a las viñetas de requisitos
    const reqLongitud = document.getElementById('req-longitud');
    const reqEspecial = document.getElementById('req-especial');
    const reqMayuscula = document.getElementById('req-mayuscula');
    const reqCoinciden = document.getElementById('req-coinciden');

    // Diagnóstico en consola para detectar si falta algún ID en el HTML
    console.log("Formulario encontrado:", formulario);
    console.log("Input Password:", inputPassword);
    console.log("Input Repetir:", inputRepetirPassword);
    console.log("Viñeta Longitud:", reqLongitud);
    console.log("Viñeta Especial:", reqEspecial);
    console.log("Viñeta Mayúscula:", reqMayuscula);
    console.log("Viñeta Coinciden:", reqCoinciden);

    if (!formulario) {
        console.error("No se encontró el formulario con la clase .formulario-registro");
        return;
    }

    // Función auxiliar para actualizar el estado visual de cada viñeta
    function actualizarRequisito(elemento, esValido, texto) {
        if (!elemento) return;
        if (esValido) {
            elemento.textContent = `✔ ${texto}`;
            elemento.classList.add('valido');
        } else {
            elemento.textContent = `❌ ${texto}`;
            elemento.classList.remove('valido');
        }
    }

    // --- VALIDACIÓN EN TIEMPO REAL MIENTRAS ESCRIBEN ---
    function validarRequisitosEnTiempoReal() {
        const passwordVal = inputPassword ? inputPassword.value : '';
        const repetirVal = inputRepetirPassword ? inputRepetirPassword.value : '';

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

    // Inicializamos al cargar
    validarRequisitosEnTiempoReal();

    // Escuchamos cuando el usuario tipea
    if (inputPassword) {
        inputPassword.addEventListener('input', validarRequisitosEnTiempoReal);
    }
    if (inputRepetirPassword) {
        inputRepetirPassword.addEventListener('input', validarRequisitosEnTiempoReal);
    }

    // --- VALIDACIÓN AL ENVIAR EL FORMULARIO ---
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombreVal = inputNombre ? inputNombre.value.trim() : '';
        const usuarioVal = inputUsuario ? inputUsuario.value.trim() : '';
        const passwordVal = inputPassword ? inputPassword.value.trim() : '';
        const repetirVal = inputRepetirPassword ? inputRepetirPassword.value.trim() : '';

        if (nombreVal === '' || usuarioVal === '' || passwordVal === '' || repetirVal === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioVal);

        if (!correoValido) {
            alert('Ingresa un correo electrónico válido.');
            if (inputUsuario) inputUsuario.focus();
            return;
        }

        if (nombreVal.includes('@')) {
            alert('El nombre de usuario no puede ser un correo electrónico. Ingresa solo un nombre de usuario.');
            if (inputNombre) inputNombre.focus();
            return;
        }

        const usuariosRegistrados = obtenerUsuariosRegistrados();
        const emailNormalizado = usuarioVal.toLowerCase();
        const usuarioExiste = usuariosRegistrados.some(user => user.email.toLowerCase() === emailNormalizado);

        if (usuarioExiste) {
            alert('Este usuario o correo ya está registrado. Prueba iniciando sesión.');
            if (inputUsuario) inputUsuario.focus();
            return;
        }

        const cumpleLongitud = passwordVal.length >= 8 && passwordVal.length <= 15;
        const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(passwordVal);
        const cumpleMayuscula = /[A-Z]/.test(passwordVal);
        const cumpleCoinciden = passwordVal === repetirVal;

        if (!cumpleLongitud || !cumpleEspecial || !cumpleMayuscula || !cumpleCoinciden) {
            alert('Por favor, verifica que la contraseña cumpla con todos los requisitos de seguridad y coincida.');
            if (inputPassword) inputPassword.focus();
            return;
        }

        const nuevoUsuario = {
            nombre: nombreVal,
            email: emailNormalizado,
            password: passwordVal
        };

        const resultadoRegistro = registrarUsuario(nuevoUsuario);
        if (resultadoRegistro === 'nombre-duplicado') {
            alert('Ese nombre de usuario ya está en uso. Elige otro.');
            if (inputNombre) inputNombre.focus();
            return;
        }
        if (resultadoRegistro !== 'registrado') {
            alert('Este correo ya está registrado. Prueba iniciando sesión.');
            if (inputUsuario) inputUsuario.focus();
            return;
        }
        guardarUsuarioActivo(emailNormalizado);

        alert(`¡Cuenta creada con éxito, ${nombreVal}! Bienvenido a Vocablo.`);
        window.location.href = 'dashboard.html';
    });
});