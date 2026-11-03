// js/views/leccion.js
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados } from '../services/storage.js';
import { respuestasCorrectas } from '../models/respuestas-correctas.js'; // <-- Importamos los datos

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivoNombre = obtenerUsuarioActivo();
    if (!usuarioActivoNombre) return;

    const formLeccion = document.getElementById('form-leccion');
    const mensajeFeedback = document.getElementById('mensaje-feedback');
    if (!formLeccion) return;

    formLeccion.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const opcionSeleccionada = document.querySelector('input[name="traduccion"]:checked');

        if (!opcionSeleccionada) {
            mensajeFeedback.textContent = 'Por favor, seleccioná una opción.';
            return;
        }

        const respuestaUsuario = opcionSeleccionada.value;
        const idLeccionActual = formLeccion.getAttribute('data-id-leccion');

        // El script va a buscar la respuesta al otro archivo importado automáticamente
        const respuestaGanadora = respuestasCorrectas[idLeccionActual];

        if (respuestaUsuario === respuestaGanadora) {
            mensajeFeedback.textContent = '¡Excelente! Ganaste 50 XP.';
            mensajeFeedback.style.color = 'green';

            const usuarios = obtenerUsuariosRegistrados();
            const index = usuarios.findIndex(user => user.nombre === usuarioActivoNombre);

            if (index !== -1) {
                usuarios[index].estadisticas.xp += 50;
                if (usuarios[index].estadisticas.racha === 0) {
                    usuarios[index].estadisticas.racha = 1;
                }
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
            }

            setTimeout(() => {
                window.location.href = 'curso-ingles.html';
            }, 2000);

        } else {
            mensajeFeedback.textContent = 'Respuesta incorrecta. ¡Intentá de nuevo!';
            mensajeFeedback.style.color = 'red';
        }
    });
});