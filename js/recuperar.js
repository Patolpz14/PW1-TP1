// js/recuperar.js
import { actualizarPassword } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario-login');
    const inputEmail = document.getElementById('email-recuperar');
    const inputNuevaPass = document.getElementById('pass-nueva');
    const inputConfirmaPass = document.getElementById('pass-confirma');

    if (!formulario) return;

    formulario.addEventListener('submit', (evento) => {
        // Frenamos el envío por defecto para controlarlo por código
        evento.preventDefault();

        const emailVal = inputEmail.value.trim();
        const nuevaPassVal = inputNuevaPass.value.trim();
        const confirmaPassVal = inputConfirmaPass.value.trim();

        // 1. Validación de campos vacíos
        if (emailVal === '' || nuevaPassVal === '' || confirmaPassVal === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // 2. Validación de que ambas contraseñas coincidan
        if (nuevaPassVal !== confirmaPassVal) {
            alert('Las contraseñas no coinciden. Por favor, revísalas.');
            inputConfirmaPass.focus();
            return;
        }

        // 3. Validación de seguridad (Longitud entre 8 y 15, mayúscula y carácter especial)
        const cumpleLongitud = nuevaPassVal.length >= 8 && nuevaPassVal.length <= 15;
        const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(nuevaPassVal);
        const cumpleMayuscula = /[A-Z]/.test(nuevaPassVal);

        if (!cumpleLongitud || !cumpleEspecial || !cumpleMayuscula) {
            alert('La contraseña no cumple con los requisitos de seguridad:\n- Entre 8 y 15 caracteres\n- Al menos una letra mayúscula\n- Al menos un carácter especial (!@#$%...)');
            inputNuevaPass.focus();
            return;
        }

        // 4. Actualizamos la contraseña en el storage (búsqueda por email en la estructura JSON)
        const cambioExitoso = actualizarPassword(emailVal, nuevaPassVal);

        if (cambioExitoso) {
            alert('¡Contraseña restablecida con éxito! Ya puedes iniciar sesión con tu nueva clave.');
            // Redirigimos al login
            window.location.href = 'index.html';
        } else {
            alert('El correo electrónico ingresado no se encuentra registrado en el sistema.');
            inputEmail.focus();
        }
    });
});