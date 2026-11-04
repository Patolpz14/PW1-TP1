// js/views/leccion.js
import { baseDeCursos } from '../models/datos-cursos.js';
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados } from '../services/storage.js';

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
    const pasoIndex = parseInt(parametrosUrl.get('paso')) || 0;

    // Si alguien entra a la página sin los parámetros de URL, lo pateamos al panel
    if (!idioma || !unidad || !cp) {
        window.location.href = 'dashboard.html';
        return;
    }

    // 3. Extraer la información específica de esta pantalla
    const checkpointActual = baseDeCursos[idioma].unidades[unidad].checkpoints[cp];
    const pasoActual = checkpointActual.pasos[pasoIndex];

    // 4. Conectar con el "cascarón" HTML
    const tituloPregunta = document.getElementById('titulo-pregunta');
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    const mensajeFeedback = document.getElementById('mensaje-feedback');
    const formLeccion = document.getElementById('form-leccion');
    const btnSalir = document.getElementById('btn-salir');
    const contadorVidas = document.getElementById('contador-vidas');
    const barraProgreso = document.getElementById('barra-progreso-activa');

    // Inicializar estado del juego
    let vidas = 3;

    // Calcular qué tan llena debe estar la barra verde (ej: 0%, 33%, 66%)
    const porcentajeProgreso = (pasoIndex / checkpointActual.pasos.length) * 100;
    barraProgreso.style.width = `${porcentajeProgreso}%`;

    // Funcionalidad del botón de salir superior
    btnSalir.addEventListener('click', (e) => {
        e.preventDefault();
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
            mensajeFeedback.textContent = `¡Excelente! +${pasoActual.xp} XP`;
            mensajeFeedback.style.color = 'green';

            sumarXP(pasoActual.xp); // Mandamos los puntos al disco duro

            const siguientePasoIndex = pasoIndex + 1;

            setTimeout(() => {
                if (siguientePasoIndex < checkpointActual.pasos.length) {
                    // Todavía quedan preguntas en este checkpoint: lo mandamos a la siguiente URL
                    window.location.href = `ejercicio.html?idioma=${idioma}&unidad=${unidad}&cp=${cp}&paso=${siguientePasoIndex}`;
                } else {
                    // ¡TERMINÓ EL CHECKPOINT! Registramos la victoria antes de volver al menú
                    registrarCheckpointCompletado(idioma, unidad, cp);
                    // Terminó todas las preguntas del checkpoint
                    alert('¡Checkpoint completado! Volviendo al menú...');
                    window.location.href = `curso.html?idioma=${idioma}`;
                }
            }, 1500);

        } else {
            // --- ¡PERDIÓ! ---
            vidas--;
            // Dibujamos los corazones restados visualmente
            contadorVidas.textContent = "❤️".repeat(vidas) + " " + vidas;

            if (vidas > 0) {
                mensajeFeedback.textContent = 'Respuesta incorrecta. ¡Intentá de nuevo!';
                mensajeFeedback.style.color = 'red';
                btnComprobar.disabled = false; // Le dejamos reintentar
            } else {
                mensajeFeedback.textContent = '¡Te quedaste sin vidas! Volviendo al menú...';
                mensajeFeedback.style.color = 'red';
                setTimeout(() => {
                    window.location.href = `curso.html?idioma=${idioma}`;
                }, 2000);
            }
        }
    });

    // 7. Herramienta interna para actualizar la base de datos
    function sumarXP(cantidadXP) {
        const usuarios = obtenerUsuariosRegistrados();
        const index = usuarios.findIndex(user => user.email === usuarioActivo);
        if (index !== -1) {
            usuarios[index].estadisticas.xp += cantidadXP;
            // Evaluamos la liga acá mismo para aprovechar el impulso
            const xpTotal = usuarios[index].estadisticas.xp;
            if (xpTotal >= 3000) usuarios[index].estadisticas.liga = "Oro";
            else if (xpTotal >= 1000) usuarios[index].estadisticas.liga = "Plata";
            else usuarios[index].estadisticas.liga = "bronce";

            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
        }
    }

    // 8. Herramienta para guardar el progreso de los niveles
    function registrarCheckpointCompletado(idioma, unidad, cp) {
        const usuarios = obtenerUsuariosRegistrados();
        const index = usuarios.findIndex(user => user.email === usuarioActivo);

        if (index !== -1) {
            // Si el usuario no tiene la propiedad 'progreso', se la creamos
            if (!usuarios[index].progreso) usuarios[index].progreso = {};
            // Si no tiene array para este idioma, se lo creamos
            if (!usuarios[index].progreso[idioma]) usuarios[index].progreso[idioma] = [];

            const idCheckpoint = `${unidad}-${cp}`; // Ej: "u1-cp1"

            // Solo lo guardamos si no lo había completado antes
            if (!usuarios[index].progreso[idioma].includes(idCheckpoint)) {
                usuarios[index].progreso[idioma].push(idCheckpoint);
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
            }
        }
    }

});