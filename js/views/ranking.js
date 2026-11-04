// js/views/ranking.js
import { obtenerUsuariosRegistrados, obtenerUsuarioActivo, cerrarSesion } from '../services/storage.js';
import { obtenerAvatar } from '../models/avatares.js';

document.addEventListener('DOMContentLoaded', () => {
    const cuerpoRanking = document.getElementById('cuerpo-ranking');
    const selectorLiga = document.getElementById('selector-liga');
    const tituloLiga = document.getElementById('titulo-liga');
    let ligaInicializada = false;

    if (!cuerpoRanking) return;

    function renderizarRanking() {
        const usuarios = obtenerUsuariosRegistrados();
        const usuarioActivo = obtenerUsuarioActivo();

        if (!ligaInicializada) {
            const usuarioActual = usuarios.find(usuario => usuario.email === usuarioActivo);
            if (selectorLiga && usuarioActual?.estadisticas?.liga) {
                selectorLiga.value = usuarioActual.estadisticas.liga.toLowerCase();
            }
            ligaInicializada = true;
        }
        const ligaSeleccionada = selectorLiga ? selectorLiga.value.toLowerCase() : 'bronce';

        const usuariosDeLiga = usuarios.filter(usuario => {
            const ligaUsuario = (usuario.estadisticas?.liga || 'bronce').toLowerCase();
            return ligaUsuario === ligaSeleccionada;
        });

        usuariosDeLiga.sort((a, b) => {
            const xpA = a.estadisticas?.xp || 0;
            const xpB = b.estadisticas?.xp || 0;
            return xpB - xpA;
        });

        cuerpoRanking.innerHTML = '';

        if (usuariosDeLiga.length === 0) {
            const filaVacia = document.createElement('tr');
            const celdaVacia = document.createElement('td');
            celdaVacia.colSpan = 4;
            celdaVacia.classList.add('mensaje-ranking-vacio');
            celdaVacia.textContent = 'No hay estudiantes en esta liga todavía.';
            filaVacia.appendChild(celdaVacia);
            cuerpoRanking.appendChild(filaVacia);
            return;
        }

        usuariosDeLiga.forEach((usuario, index) => {
            const puesto = index + 1;
            const xp = usuario.estadisticas?.xp || 0;
            const nombre = usuario.nombre || usuario.email?.split('@')[0] || 'Estudiante';
            const esUsuarioActual = Boolean(usuarioActivo && usuario.email === usuarioActivo);
            const enTopCinco = puesto <= 5;
            const textoEstado = enTopCinco ? 'Top 5' : 'En tabla';
            const avatar = obtenerAvatar(usuario.avatar);

            const fila = document.createElement('tr');
            fila.classList.toggle('fila-usuario-actual', esUsuarioActual);

            const celdaPuesto = document.createElement('td');
            celdaPuesto.textContent = puesto === 1 ? '🥇 1' : puesto === 2 ? '🥈 2' : puesto === 3 ? '🥉 3' : `${puesto}`;

            const celdaEstudiante = document.createElement('td');
            const contenedorEstudiante = document.createElement('div');
            contenedorEstudiante.classList.add('celda-estudiante');
            const avatarElemento = document.createElement('span');
            avatarElemento.classList.add('avatar-mini');
            avatarElemento.style.backgroundColor = avatar?.color ?? '#e5e7eb';
            avatarElemento.setAttribute('aria-hidden', 'true');
            avatarElemento.textContent = avatar?.icono ?? '👤';
            const nombreElemento = document.createElement('span');
            nombreElemento.textContent = `${nombre}${esUsuarioActual ? ' (Tú)' : ''}`;
            contenedorEstudiante.append(avatarElemento, nombreElemento);
            celdaEstudiante.appendChild(contenedorEstudiante);

            const celdaXp = document.createElement('td');
            celdaXp.textContent = `${xp} XP`;

            const celdaEstado = document.createElement('td');
            celdaEstado.textContent = textoEstado;
            if (enTopCinco) celdaEstado.classList.add('estado-ascenso');

            fila.append(celdaPuesto, celdaEstudiante, celdaXp, celdaEstado);

            cuerpoRanking.appendChild(fila);
        });
    }

    function actualizarTituloLiga() {
        if (!selectorLiga || !tituloLiga) return;
        const opcion = selectorLiga.options[selectorLiga.selectedIndex];
        tituloLiga.textContent = `🏆 Tabla de Clasificación - ${opcion.text}`;
    }

    if (selectorLiga) {
        selectorLiga.addEventListener('change', () => {
            actualizarTituloLiga();
            renderizarRanking();
        });
    }

    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarSesion();
            window.location.href = 'index.html';
        });
    }

    // Ejecutamos la renderización al cargar la página
    renderizarRanking();
    actualizarTituloLiga();
});