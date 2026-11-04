// js/views/curso.js
import { baseDeCursos } from '../models/datos-cursos.js';
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivoNombre = obtenerUsuarioActivo();
    if (!usuarioActivoNombre) {
        window.location.href = 'index.html';
        return;
    }

    const usuarios = obtenerUsuariosRegistrados();
    const usuarioData = usuarios.find(u => u.nombre === usuarioActivoNombre);
    const xpReal = usuarioData ? usuarioData.estadisticas.xp : 0;

    // Traemos el progreso del usuario para este idioma (si no tiene, creamos un array vacío)
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idiomaId = parametrosUrl.get('idioma');

    const progresoUsuario = (usuarioData.progreso && usuarioData.progreso[idiomaId])
        ? usuarioData.progreso[idiomaId]
        : [];

    if (!idiomaId || !baseDeCursos[idiomaId]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const datosCurso = baseDeCursos[idiomaId];

    document.getElementById('titulo-curso').textContent = `${datosCurso.nombre} - Nivel ${datosCurso.nivel}`;
    document.getElementById('estadistica-xp').textContent = `⭐ ${xpReal} XP`;

    const contenedorUnidades = document.getElementById('contenedor-unidades');
    contenedorUnidades.innerHTML = '';

    let bloqueoGlobalActivado = false; // Esta bandera nos avisa cuando encontramos el primer nivel sin hacer

    Object.entries(datosCurso.unidades).forEach(([idUnidad, datosUnidad]) => {
        let htmlCheckpoints = '';
        let contadorCp = 1;
        let unidadTieneContenidoActivo = false;

        Object.entries(datosUnidad.checkpoints).forEach(([idCp, datosCp]) => {
            const idProgreso = `${idUnidad}-${idCp}`; // Armamos la etiqueta, ej: "u1-cp1"
            const estaCompletado = progresoUsuario.includes(idProgreso);

            let claseEstado = "";
            let icono = "";
            let atributoAria = "";
            let href = "";

            if (estaCompletado) {
                // Ya lo pasó, puede volver a jugarlo
                claseEstado = "completada";
                icono = "✔";
                href = `href="ejercicio.html?idioma=${idiomaId}&unidad=${idUnidad}&cp=${idCp}&paso=0"`;
                unidadTieneContenidoActivo = true;
            } else if (!bloqueoGlobalActivado) {
                // Es el primero que no pasó. Se vuelve el nivel activo.
                claseEstado = "activa";
                icono = "⭐";
                href = `href="ejercicio.html?idioma=${idiomaId}&unidad=${idUnidad}&cp=${idCp}&paso=0"`;
                unidadTieneContenidoActivo = true;
                bloqueoGlobalActivado = true; // A partir de acá, todos los siguientes se bloquean
            } else {
                // No lo pasó y el bloqueo ya está activo
                claseEstado = "bloqueada";
                icono = "🔒";
                atributoAria = 'aria-disabled="true"';
                href = ``; // No tiene link, no se puede hacer clic
            }

            htmlCheckpoints += `
                <li class="leccion ${claseEstado}">
                    <a ${href} class="btn-leccion" ${atributoAria}>
                        <span class="icono-estado">${icono}</span>
                        <span class="nombre-leccion">${contadorCp}. ${datosCp.titulo}</span>
                    </a>
                </li>
            `;
            contadorCp++;
        });

        // Si la unidad no tiene ningún checkpoint completado ni activo, oscurecemos toda la caja
        const claseUnidad = unidadTieneContenidoActivo ? "" : "bloqueada";

        contenedorUnidades.innerHTML += `
            <section class="unidad-curso ${claseUnidad}">
                <header class="cabecera-unidad">
                    <h2>${datosUnidad.titulo}</h2>
                    <p>Completa las lecciones anteriores para desbloquear.</p>
                </header>
                <ol class="camino-lecciones">
                    ${htmlCheckpoints}
                </ol>
            </section>
        `;
    });
});