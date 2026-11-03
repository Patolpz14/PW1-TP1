// js/dashboard.js
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados, cerrarSesion } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Guardado de ruta: Si no hay usuario activo, lo regresamos al login
    const usuarioActivoNombre = obtenerUsuarioActivo();

    if (!usuarioActivoNombre) {
        window.location.href = 'index.html';
        return;
    }

    // Busqueda de  los datos del usuario en el storage
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.nombre === usuarioActivoNombre);

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

        usuarioActual.cursos.forEach(curso => {
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
                        <div class="barra-progreso-nivel" style="width: ${curso.progreso}%;"></div>
                    </div>
                    <span>${curso.progreso}% completado</span>
                </div>
                <button class="btn-continuar" data-id="${curso.id}">Empezar</button>
            `;

            grillaCursos.appendChild(tarjeta);
        });

        // Eventos para los botones de empezar curso
        const botonesContinuar = grillaCursos.querySelectorAll('.btn-continuar');
        botonesContinuar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const cursoId = e.target.getAttribute('data-id');
                window.location.href = `curso-${cursoId}.html`;
            });
        });
    }

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
});