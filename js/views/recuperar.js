import { actualizarPassword, obtenerUsuariosRegistrados } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-recuperar');
    const inputEmail = document.getElementById('email-recuperar');
    const inputNuevaPass = document.getElementById('pass-nueva');
    const inputConfirmaPass = document.getElementById('pass-confirma');

    if (!formulario || !inputEmail || !inputNuevaPass || !inputConfirmaPass) return;

    const requisitos = {
        longitud: document.getElementById('req-longitud'),
        especial: document.getElementById('req-especial'),
        mayuscula: document.getElementById('req-mayuscula'),
        coinciden: document.getElementById('req-coinciden')
    };

    function actualizarRequisito(elemento, cumple, texto) {
        if (!elemento) return;
        elemento.textContent = `${cumple ? '✓' : '*'} ${texto}`;
        elemento.classList.toggle('valido', cumple);
        elemento.classList.toggle('invalido', !cumple);
    }

    function validarRequisitos() {
        const password = inputNuevaPass.value;
        actualizarRequisito(requisitos.longitud, password.length >= 8 && password.length <= 15, 'Entre 8 y 15 caracteres');
        actualizarRequisito(requisitos.especial, /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(password), 'Al menos un carácter especial (!@#$%...)');
        actualizarRequisito(requisitos.mayuscula, /[A-Z]/.test(password), 'Al menos una letra mayúscula');
        actualizarRequisito(requisitos.coinciden, password !== '' && password === inputConfirmaPass.value, 'Ambas contraseñas coinciden');
    }

    inputNuevaPass.addEventListener('input', validarRequisitos);
    inputConfirmaPass.addEventListener('input', validarRequisitos);
    validarRequisitos();

    formulario.addEventListener('submit', evento => {
        evento.preventDefault();

        const email = inputEmail.value.trim().toLowerCase();
        const password = inputNuevaPass.value;
        const confirmarPassword = inputConfirmaPass.value;

        if (!email || !password || !confirmarPassword) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const usuarioExiste = obtenerUsuariosRegistrados().some(usuario =>
            usuario.email.toLowerCase() === email
        );
        if (!usuarioExiste) {
            alert('No se encontró una cuenta registrada con ese correo.');
            inputEmail.focus();
            return;
        }

        const passwordValida = password.length >= 8
            && password.length <= 15
            && /[!@#$%^&*(),.?":{}|<>\-_=+[\]\\/`~]/.test(password)
            && /[A-Z]/.test(password);
        if (!passwordValida || password !== confirmarPassword) {
            alert('Verifica que la contraseña cumpla todos los requisitos y que ambas coincidan.');
            inputNuevaPass.focus();
            return;
        }

        if (!actualizarPassword(email, password)) {
            alert('No se pudo actualizar la contraseña. Inténtalo nuevamente.');
            return;
        }

        alert('Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.');
        window.location.href = 'index.html';
    });
});
