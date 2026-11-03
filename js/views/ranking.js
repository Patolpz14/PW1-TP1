// js/views/ranking.js
import { obtenerUsuariosRegistrados, obtenerUsuarioActivo } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const cuerpoRanking = document.getElementById('cuerpo-ranking');
    const selectorLiga = document.getElementById('selector-liga');
    const tituloLiga = document.getElementById('titulo-liga');

    if (!cuerpoRanking) return;

    function renderizarRanking() {
        const usuarios = obtenerUsuariosRegistrados();
        const usuarioActivo = obtenerUsuarioActivo();

        // 1. Obtenemos la liga seleccionada actualmente (ej: 'bronce', 'plata', 'oro')
        const ligaSeleccionada = selectorLiga ? selectorLiga.value : 'bronce';

        // 2. FILTRAMOS los usuarios que pertenecen estrictamente a la liga seleccionada
        // Si el usuario no tiene la propiedad 'liga' definida, por defecto lo mandamos a 'bronce'
        const usuariosDeLiga = usuarios.filter(usuario => {
            const ligaUsuario = usuario.liga || 'bronce';
            return ligaUsuario === ligaSeleccionada;
        });

        // 3. Ordenamos a los usuarios filtrados de mayor a menor según su XP
        usuariosDeLiga.sort((a, b) => {
            const xpA = a.estadisticas?.xp || a.xp || 0;
            const xpB = b.estadisticas?.xp || b.xp || 0;
            return xpB - xpA;
        });

        // 4. Limpiamos la tabla antes de renderizar
        cuerpoRanking.innerHTML = '';

        if (usuariosDeLiga.length === 0) {
            cuerpoRanking.innerHTML = `<tr><td colspan="4" style="padding: 2rem; color: #6b7280;">No hay estudiantes en esta liga todavía.</td></tr>`;
            return;
        }

        // 5. Generamos las filas dinámicamente para los usuarios de esta liga
        usuariosDeLiga.forEach((usuario, index) => {
            const puesto = index + 1;
            const xp = usuario.estadisticas?.xp || usuario.xp || 0;
            const nombre = usuario.nombre || usuario.email.split('@')[0];
            const esUsuarioActual = usuarioActivo && usuario.email === usuarioActivo.email;

            // Icono o medalla según el puesto
            let iconoPuesto = `${puesto}`;
            if (puesto === 1) iconoPuesto = `🥇 1`;
            else if (puesto === 2) iconoPuesto = `🥈 2`;
            else if (puesto === 3) iconoPuesto = `🥉 3`;

            // Estado de ascenso (los primeros 5 ascienden)
            const enZonaAscenso = puesto <= 5;
            const textoEstado = enZonaAscenso ? 'Zona de Ascenso' : 'En mantener';

            const avatar = usuario.avatar || 'img/avatar-generico.png';

            const fila = document.createElement('tr');
            if (esUsuarioActual) {
                fila.classList.add('fila-usuario-actual');
            }

            fila.innerHTML = `
                <td>${iconoPuesto}</td>
                <td>
                    <div class="celda-estudiante">
                        <img src="${avatar}" alt="Foto de ${nombre}" class="avatar-mini">
                        <span>${nombre} ${esUsuarioActual ? '(Tú)' : ''}</span>
                    </div>
                </td>
                <td>${xp} XP</td>
                <td class="${enZonaAscenso ? 'estado-ascenso' : ''}">${textoEstado}</td>
            `;

            cuerpoRanking.appendChild(fila);
        });
    }

    // Evento al cambiar de liga en el selector superior
    if (selectorLiga) {
        selectorLiga.addEventListener('change', (e) => {
            const nombreLigaTexto = e.target.options[e.target.selectedIndex].text;
            if (tituloLiga) {
                tituloLiga.textContent = `🏆 Tabla de Clasificación - ${nombreLigaTexto}`;
            }
            renderizarRanking();
        });
    }

    // Ejecutamos la renderización al cargar la página
    renderizarRanking();
});