import { obtenerUsuarioActivo, obtenerUsuariosRegistrados, cerrarSesion } from '../services/storage.js';
import { baseDeCursos } from '../models/datos-cursos.js';

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = obtenerUsuarioActivo();

    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }

    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.email === usuarioActivo);

    if (!usuarioActual) {
        cerrarSesion();
        window.location.href = 'index.html';
        return;
    }

    const spanNombre = document.getElementById('nombre-usuario');
    if (spanNombre) {
        spanNombre.textContent = usuarioActual.nombre;
    }

    const grillaCursos = document.getElementById('grilla-cursos');

    if (grillaCursos && usuarioActual.cursos) {
        grillaCursos.innerHTML = '';

        usuarioActual.cursos.forEach(curso => {
            const datosCurso = baseDeCursos[curso.id];

            if (!datosCurso) {
                console.error(`No se encontraron datos para el curso "${curso.id}".`);
                return;
            }

            const totalCheckpoints = Object.values(datosCurso.unidades)
                .reduce((total, unidad) => total + Object.keys(unidad.checkpoints).length, 0);

            const checkpointsCompletados =
                usuarioActual.progreso?.[curso.id]?.length ?? 0;

            const porcentaje = totalCheckpoints > 0
                ? Math.round((checkpointsCompletados / totalCheckpoints) * 100)
                : 0;

            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-curso');

            tarjeta.innerHTML = `
                <div class="curso-header">
                    <img src="${curso.bandera}" alt="Bandera de ${curso.nombre}" class="bandera-curso">
                    <h3>${curso.nombre}</h3>
                </div>
                <div class="curso-body">
                    <p>Nivel: <strong>${curso.nivel}</strong></p>
                    <div class="barra-progreso-fondo">
                        <div class="barra-progreso-nivel" style="width: ${porcentaje}%;"></div>
                    </div>
                    <span>${porcentaje}% completado</span>
                </div>
                <a href="curso.html?idioma=${encodeURIComponent(curso.id)}" class="btn-continuar">Empezar</a>
            `;

            grillaCursos.appendChild(tarjeta);
        });

        const listaEstadisticas = document.getElementById('lista-estadisticas');

        if (listaEstadisticas && usuarioActual.estadisticas) {
            listaEstadisticas.innerHTML = `
                <li class="stat-item">
                    <span class="stat-icono">🔥</span>
                    <div class="stat-info">
                        <strong>Racha</strong>
                        <p>${usuarioActual.estadisticas.racha} días</p>
                    </div>
                </li>
                <li class="stat-item">
                    <span class="stat-icono">⚡</span>
                    <div class="stat-info">
                        <strong>Experiencia</strong>
                        <p>${usuarioActual.estadisticas.xp} XP</p>
                    </div>
                </li>
                <li class="stat-item">
                    <span class="stat-icono">🏆</span>
                    <div class="stat-info">
                        <strong>Liga Actual</strong>
                        <p>${usuarioActual.estadisticas.liga}</p>
                    </div>
                </li>
            `;
        }

        const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', () => {
                cerrarSesion();
                window.location.href = 'index.html';
            });
        }
    }
});