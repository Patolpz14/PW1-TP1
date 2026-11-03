// js/perfil.js
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados, cerrarSesion } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Validar sesión activa
    const usuarioActivoNombre = obtenerUsuarioActivo();
    if (!usuarioActivoNombre) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Obtener datos del usuario desde el array de registrados
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.nombre === usuarioActivoNombre);

    if (!usuarioActual) {
        cerrarSesion();
        window.location.href = 'index.html';
        return;
    }

    // 3. Inyectar datos en la vista de perfil
    document.getElementById('perfil-nombre').textContent = usuarioActual.nombre;
    document.getElementById('perfil-arroba').textContent = `@${usuarioActual.nombre.toLowerCase().replace(/\s+/g, '')}`;
    document.getElementById('perfil-email').textContent = usuarioActual.email;

    if (usuarioActual.estadisticas) {
        document.getElementById('perfil-xp').textContent = `${usuarioActual.estadisticas.xp} XP`;
        document.getElementById('perfil-racha').textContent = `${usuarioActual.estadisticas.racha} Días`;
    }

    // --- REFERENCIAS PARA LA VALIDACIÓN EN TIEMPO REAL ---
    const inputPassActual = document.getElementById('pass-actual');
    const inputPassNueva = document.getElementById('pass-nueva');
    const inputPassConfirma = document.getElementById('pass-confirma');

    const reqLongitud = document.getElementById('req-longitud');
    const reqEspecial = document.getElementById('req-especial');
    const reqMayuscula = document.getElementById('req-mayuscula');
    const reqCoinciden = document.getElementById('req-coinciden');
    const reqDiferente = document.getElementById('req-diferente');

    // Función auxiliar para actualizar visualmente las viñetas
    function actualizarRequisito(elemento, cumple, texto) {
        if (!elemento) return;
        if (cumple) {
            elemento.textContent = `✓ ${texto}`;
            elemento.classList.remove('invalido');
            elemento.classList.add('valido');
        } else {
            elemento.textContent = `*${texto}`;
            elemento.classList.remove('valido');
            elemento.classList.add('invalido');
        }
    }

    // Función principal de validación en tiempo real
    function validarRequisitosEnTiempoReal() {
        const actualVal = inputPassActual ? inputPassActual.value : '';
        const passwordVal = inputPassNueva ? inputPassNueva.value : '';
        const repetirVal = inputPassConfirma ? inputPassConfirma.value : '';

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

        // 5. Que no sea igual a la contraseña actual (comparando contra la actual real del usuario)
        const cumpleDiferente = passwordVal !== '' && passwordVal !== usuarioActual.password;
        actualizarRequisito(reqDiferente, cumpleDiferente, "Diferente a la contraseña actual");
    }

    // Escuchadores de eventos para la validación en tiempo real
    if (inputPassActual) {
        inputPassActual.addEventListener('input', validarRequisitosEnTiempoReal);
    }
    if (inputPassNueva) {
        inputPassNueva.addEventListener('input', validarRequisitosEnTiempoReal);
    }
    if (inputPassConfirma) {
        inputPassConfirma.addEventListener('input', validarRequisitosEnTiempoReal);
    }

    // 4. Manejo del formulario de cambio de contraseña al hacer SUBMIT
    const formPassword = document.getElementById('form-cambiar-password');
    if (formPassword) {
        formPassword.addEventListener('submit', (e) => {
            e.preventDefault();

            const passActual = inputPassActual.value;
            const passNueva = inputPassNueva.value;
            const passConfirma = inputPassConfirma.value;

            // VALIDACIÓN OBLIGATORIA: La contraseña actual escrita debe coincidir con la real
            if (passActual !== usuarioActual.password) {
                alert('La contraseña actual es incorrecta. Por favor, ingrésala bien para continuar.');
                inputPassActual.focus();
                return;
            }

            // Validaciones rigurosas antes de guardar
            const cumpleLongitud = passNueva.length >= 8 && passNueva.length <= 15;
            const cumpleEspecial = /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(passNueva);
            const cumpleMayuscula = /[A-Z]/.test(passNueva);
            const cumpleCoinciden = passNueva === passConfirma;
            const cumpleDiferente = passNueva !== usuarioActual.password;

            if (!cumpleLongitud || !cumpleEspecial || !cumpleMayuscula || !cumpleCoinciden || !cumpleDiferente) {
                alert('Por favor, asegúrate de que la nueva contraseña cumpla con todos los requisitos de seguridad.');
                return;
            }

            // Actualizar contraseña en el objeto del usuario
            usuarioActual.password = passNueva;

            // Guardar cambios en el array general de usuarios y actualizar localStorage
            const index = usuarios.findIndex(user => user.nombre === usuarioActivoNombre);
            if (index !== -1) {
                usuarios[index] = usuarioActual;
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
                alert('¡Contraseña actualizada con éxito!');
                formPassword.reset();
                validarRequisitosEnTiempoReal();
            }
        });
    }

    // 5. Botón de cerrar sesión
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarSesion();
            window.location.href = 'index.html';
        });
    }
});