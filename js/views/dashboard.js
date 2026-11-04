// js/dashboard.js
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados, cerrarSesion } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Guardado de ruta: Si no hay usuario activo, lo regresamos al login
    const usuarioActivo = obtenerUsuarioActivo();

    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }

    // Busqueda de  los datos del usuario en el storage
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.email === usuarioActivo);

    if (!usuarioActual) {
        cerrarSesion();
        window.location.href = 'index.html';
        return;
    }

    //  Se inyecta el nombre real del usuario en el span de bienvenida
    const spanNombre = document.getElementById('nombre-usuario');
    if (spanNombre) {
        spanNombre.textContent = usuarioActual.nombre;
    }

    // Renderizamos dinámicamente los 4 cursos con sus 0% iniciales
    const grillaCursos = document.getElementById('grilla-cursos');
    if (grillaCursos && usuarioActual.cursos) {
        grillaCursos.innerHTML = '';

        // El total de niveles por idioma es 9 (3 unidades de 3 checkpoints)
        const totalNiveles = 9;

        usuarioActual.cursos.forEach(curso => {
            // 1. Buscamos cuántos niveles completó de este idioma específico
            let nivelesCompletados = 0;
            if (usuarioActual.progreso && usuarioActual.progreso[curso.id]) {
                nivelesCompletados = usuarioActual.progreso[curso.id].length;
            }

            // 2. Calculamos el porcentaje exacto y lo redondeamos
            const porcentaje = Math.round((nivelesCompletados / totalNiveles) * 100);

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
                <a href="curso.html?idioma=${curso.id}" class="btn-continuar" style="display: block; text-align: center; text-decoration: none;">Empezar</a>
            `;

            grillaCursos.appendChild(tarjeta);
        });


        // Renderizamos las estadísticas iniciales en #lista-estadisticas
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

        // Manejo del botón de cerrar sesión
        const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', () => {
                cerrarSesion();
                window.location.href = 'index.html';
            });
        }
    }
});