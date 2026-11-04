// js/views/leccion.js
import { baseDeCursos } from '../models/datos-cursos.js';
import {
    actualizarSesionLeccion,
    cerrarSesionLeccion,
    iniciarSesionLeccion,
    obtenerUsuarioActivo,
    obtenerUsuariosRegistrados,
    registrarCheckpointCompletado
} from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seguridad: Validar que haya un usuario logueado
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }
    // 2. Leer las coordenadas exactas desde la URL
    // Ejemplo esperado: ?idioma=ingles&unidad=u1&cp=cp1&paso=0
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idioma = parametrosUrl.get('idioma');
    const unidad = parametrosUrl.get('unidad');
    const cp = parametrosUrl.get('cp');
    const pasoParametro = parametrosUrl.get('paso');
    const pasoIndex = pasoParametro === null ? 0 : Number(pasoParametro);

    // Si alguien entra a la página sin los parámetros de URL, lo pateamos al panel
    if (!idioma || !unidad || !cp || !Number.isInteger(pasoIndex) || pasoIndex < 0) {
        window.location.href = 'dashboard.html';
        return;
    }

    // 3. Extraer la información específica de esta pantalla
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.email === usuarioActivo);
    const checkpointActual = baseDeCursos[idioma]?.unidades?.[unidad]?.checkpoints?.[cp];
    if (!usuarioActual || !usuarioActual.cursos?.some(curso => curso.id === idioma) || !checkpointActual) {
        window.location.href = 'dashboard.html';
        return;
    }

    const idCheckpoint = `${unidad}-${cp}`;
    const progresoCurso = usuarioActual.progreso?.[idioma] ?? [];
    if (!progresoCurso.includes(idCheckpoint)) {
        const primerCheckpointPendiente = Object.entries(baseDeCursos[idioma].unidades)
            .flatMap(([idUnidad, datosUnidad]) =>
                Object.keys(datosUnidad.checkpoints).map(idCp => `${idUnidad}-${idCp}`)
            )
            .find(id => !progresoCurso.includes(id));
        if (primerCheckpointPendiente !== idCheckpoint) {
            window.location.href = `curso.html?idioma=${encodeURIComponent(idioma)}`;
            return;
        }
    }

    const pasoActual = checkpointActual.pasos[pasoIndex];
    if (!pasoActual) {
        window.location.href = `curso.html?idioma=${encodeURIComponent(idioma)}`;
        return;
    }

    const sesionLeccion = iniciarSesionLeccion(usuarioActivo, idioma, unidad, cp, pasoIndex);
    if (!sesionLeccion) {
        window.location.href = `curso.html?idioma=${encodeURIComponent(idioma)}`;
        return;
    }

    // 4. Conectar con el "cascarón" HTML
    const tituloPregunta = document.getElementById('titulo-pregunta');
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    const mensajeFeedback = document.getElementById('mensaje-feedback');
    const formLeccion = document.getElementById('form-leccion');
    const btnSalir = document.getElementById('btn-salir');
    const contadorVidas = document.getElementById('contador-vidas');
    const barraProgreso = document.getElementById('barra-progreso-activa');

    // Inicializar estado del juego
    let vidas = sesionLeccion.vidas;

    // Calcular qué tan llena debe estar la barra verde (ej: 0%, 33%, 66%)
    const porcentajeProgreso = (pasoIndex / checkpointActual.pasos.length) * 100;
    barraProgreso.style.width = `${porcentajeProgreso}%`;

    // Funcionalidad del botón de salir superior
    btnSalir.addEventListener('click', (e) => {
        e.preventDefault();
        cerrarSesionLeccion();
        window.location.href = `curso.html?idioma=${idioma}`; // Te devuelve al menú de este idioma específico
    });

    // 5. El Renderizador Mágico (Inyectar contenido según el tipo)
    tituloPregunta.textContent = pasoActual.pregunta;
    contenedorOpciones.innerHTML = ''; // Limpiamos la zona

    if (pasoActual.tipo === 'choice' || pasoActual.tipo === 'vf') {
        // Formato de burbujas seleccionables
        pasoActual.opciones.forEach(opcion => {
            contenedorOpciones.innerHTML += `
                <label class="tarjeta-opcion">
                    <input type="radio" name="respuesta" value="${opcion.valor}" required>
                    <span class="texto-opcion">${opcion.etiqueta}</span>
                </label>
            `;
        });
    } else if (pasoActual.tipo === 'texto') {
        // Formato de escritura libre
        contenedorOpciones.innerHTML = `
            <input type="text" name="respuesta" id="input-texto" class="input-leccion" placeholder="Escribe tu respuesta aquí..." required autocomplete="off">
        `;
    }

    // 6. El Juez: Evaluar la respuesta al hacer clic
    formLeccion.addEventListener('submit', (evento) => {
        evento.preventDefault();

        let respuestaUsuario = "";

        // Capturamos el valor dependiendo de cómo se armó la pantalla
        if (pasoActual.tipo === 'choice' || pasoActual.tipo === 'vf') {
            const seleccion = document.querySelector('input[name="respuesta"]:checked');
            if (!seleccion) return;
            respuestaUsuario = seleccion.value;
        } else if (pasoActual.tipo === 'texto') {
            const inputTexto = document.getElementById('input-texto');
            // Trampa de desarrollador: Pasamos todo a minúscula y borramos espacios extra para que no falle por un error de tipeo tonto
            respuestaUsuario = inputTexto.value.trim().toLowerCase();
        }

        const btnComprobar = document.getElementById('btn-comprobar');
        btnComprobar.disabled = true; // Bloqueamos el botón para que no hagan doble clic

        // EVALUACIÓN
        if (respuestaUsuario === pasoActual.correcta) {
            // --- ¡GANÓ! ---
            mensajeFeedback.textContent = '¡Excelente! Respuesta correcta.';
            mensajeFeedback.style.color = 'green';

            const siguientePasoIndex = pasoIndex + 1;

            setTimeout(() => {
                if (siguientePasoIndex < checkpointActual.pasos.length) {
                    if (!actualizarSesionLeccion(usuarioActivo, siguientePasoIndex, vidas)) {
                        cerrarSesionLeccion();
                        window.location.href = `curso.html?idioma=${encodeURIComponent(idioma)}`;
                        return;
                    }
                    // Todavía quedan preguntas en este checkpoint: lo mandamos a la siguiente URL
                    window.location.href = `ejercicio.html?idioma=${idioma}&unidad=${unidad}&cp=${cp}&paso=${siguientePasoIndex}`;
                } else {
                    const resultado = registrarCheckpointCompletado(usuarioActivo, idioma, unidad, cp);
                    if (resultado.status === 'bloqueado' || resultado.status === 'no-encontrado') {
                        alert('No se pudo guardar este checkpoint. Vuelve a intentarlo desde el curso.');
                        window.location.href = `curso.html?idioma=${encodeURIComponent(idioma)}`;
                        return;
                    }
                    mensajeFeedback.textContent = resultado.xp > 0
                        ? `¡Checkpoint completado! +${resultado.xp} XP`
                        : '¡Checkpoint completado! Ya habías recibido la XP de este checkpoint.';
                    // Terminó todas las preguntas del checkpoint
                    alert('¡Checkpoint completado! Volviendo al menú...');
                    window.location.href = `curso.html?idioma=${idioma}`;
                }
            }, 1500);

        } else {
            // --- ¡PERDIÓ! ---
            vidas--;
            actualizarSesionLeccion(usuarioActivo, pasoIndex, vidas);
            // Dibujamos los corazones restados visualmente
            contadorVidas.textContent = `${"❤️".repeat(vidas)} ${vidas}`;

            if (vidas > 0) {
                mensajeFeedback.textContent = 'Respuesta incorrecta. ¡Intentá de nuevo!';
                mensajeFeedback.style.color = 'red';
                btnComprobar.disabled = false; // Le dejamos reintentar
            } else {
                cerrarSesionLeccion();
                mensajeFeedback.textContent = '¡Te quedaste sin vidas! Volviendo al menú...';
                mensajeFeedback.style.color = 'red';
                setTimeout(() => {
                    window.location.href = `curso.html?idioma=${idioma}`;
                }, 2000);
            }
        }
    });

});