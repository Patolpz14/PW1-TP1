// js/login.js
import { validarCredenciales, guardarUsuarioActivo } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario-login');
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');

    // Capturamos los spans de error del HTML
    const errorUsuario = document.getElementById('error-usuario');
    const errorPassword = document.getElementById('error-password');

    if (!formulario) return;

    // Función auxiliar para limpiar los errores visuales
    function limpiarErrores() {
        inputUsuario.classList.remove('error');
        inputPassword.classList.remove('error');
        if (errorUsuario) errorUsuario.textContent = '';
        if (errorPassword) errorPassword.textContent = '';
    }

    inputUsuario.addEventListener('focus', () => {
        inputUsuario.value = ''; // Borra lo escrito anteriormente
        inputUsuario.classList.remove('error');
        if (errorUsuario) errorUsuario.textContent = '';
    });

    inputPassword.addEventListener('focus', () => {
        inputPassword.value = ''; // Borra lo escrito anteriormente
        inputPassword.classList.remove('error');
        if (errorPassword) errorPassword.textContent = '';
    });

    formulario.addEventListener('submit', (evento) => {
        // 1. Frenamos por completo el comportamiento nativo y la recarga
        evento.preventDefault();

        // 2. Limpiamos errores previos al iniciar un nuevo intento
        limpiarErrores();

        const usuarioVal = inputUsuario.value.trim();
        const passwordVal = inputPassword.value.trim();

        let hayErrores = false;

        // Validaciones de campos vacíos
        if (usuarioVal === '') {
            inputUsuario.classList.add('error');
            if (errorUsuario) errorUsuario.textContent = 'Por favor, completa este campo.';
            hayErrores = true;
        }

        if (passwordVal === '') {
            inputPassword.classList.add('error');
            if (errorPassword) errorPassword.textContent = 'Por favor, completa este campo.';
            hayErrores = true;
        }

        if (hayErrores) return;

        // 3. Verificamos contra el localStorage / JSON
        const usuarioValido = validarCredenciales(usuarioVal, passwordVal);

        if (!usuarioValido) {
            // Si las credenciales son incorrectas:
            // - Mantenemos lo que el usuario escribió en los inputs (NO los borramos)
            // - Marcamos ambos campos con la clase .error (se pondrán en rojo gracias al CSS)
            inputUsuario.classList.add('error');
            inputPassword.classList.add('error');

            // - Mostramos los textos de error en los spans
            if (errorUsuario) errorUsuario.textContent = 'Usuario o correo incorrecto.';
            if (errorPassword) errorPassword.textContent = 'Contraseña incorrecta.';

            // IMPORTANTE: Ya no borramos inputPassword.value para que no se pierda lo que tipeaste.
            return;
        }

        // Si todo es correcto, guardamos la sesión y redirigimos al dashboard
        guardarUsuarioActivo(usuarioValido.nombre);
        window.location.href = 'dashboard.html';
    });
});