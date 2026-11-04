// js/services/storage.js
import { baseDeCursos } from '../models/datos-cursos.js';
import { obtenerAvatar } from '../models/avatares.js';

const USUARIOS_DB_KEY = 'usuariosRegistrados';
const USUARIO_ACTIVO_KEY = 'usuarioActivo';
const DEMO_PROGRESS_RESET_KEY = 'demoProgressResetVersion';
const DEMO_PROGRESS_RESET_VERSION = '1';
const COURSE_ACCESS_MIGRATION_KEY = 'courseAccessMigrationVersion';
const COURSE_ACCESS_MIGRATION_VERSION = '1';
const USUARIOS_DEMO_EMAILS = new Set([
    'felicianoayala@outlook.es',
    'mariag@gmail.com',
    'carlos@outlook.com',
    'estela@gmail.com',
    'pedro@yahoo.com',
    'sofia.lin@gmail.com',
    'lucas.rossi@gmail.com',
    'valentinaruiz@hotmail.com',
    'mateof@outlook.com',
    'camila.torres@gmail.com',
    'joaquin.b@yahoo.com',
    'luciamorales@gmail.com',
    'agustindev@outlook.es',
    'martu.silva@gmail.com',
    'nico.castro@hotmail.com'
]);
const CURSOS_INICIALES = [
    { id: 'ingles', nombre: 'Inglés', bandera: '../img/reino-unido.png', nivel: 'Inicial', progreso: 0 },
    { id: 'aleman', nombre: 'Alemán', bandera: '../img/alemania.png', nivel: 'Inicial', progreso: 0 },
    { id: 'chino', nombre: 'Chino', bandera: '../img/china.png', nivel: 'Inicial', progreso: 0 }
];
const CURSO_COMPRABLE = {
    id: 'coreano',
    nombre: 'Coreano',
    bandera: '../img/corea-del-sur.png',
    nivel: 'Inicial',
    progreso: 0
};
const AVATAR_INICIAL_ID = 'avatar-generico';
export const COSTO_AVATAR = 10;
const SESION_LECCION_KEY = 'sesionLeccion';

const COSTOS_CONSUMIBLES = {
    protectorRacha: 200,
    recargaVidas: 50
};

function normalizarEmail(email) {
    return email.trim().toLowerCase();
}

function normalizarNombreUsuario(nombre) {
    return nombre.trim().replace(/\s+/g, ' ').toLowerCase();
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));
}

function obtenerFechaLocal(fecha = new Date()) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

export function obtenerXpDiaria(usuario) {
    const estadisticas = usuario?.estadisticas;
    return estadisticas?.fechaXpDiaria === obtenerFechaLocal()
        ? estadisticas.xpDiaria ?? 0
        : 0;
}

function obtenerDiaAnterior(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    const fechaAnterior = new Date(Date.UTC(anio, mes - 1, dia - 1));
    return `${fechaAnterior.getUTCFullYear()}-${String(fechaAnterior.getUTCMonth() + 1).padStart(2, '0')}-${String(fechaAnterior.getUTCDate()).padStart(2, '0')}`;
}

function actualizarRacha(usuario, hoy) {
    const estadisticas = usuario.estadisticas;
    if (estadisticas.fechaUltimaPractica === hoy) return;

    const ayer = obtenerDiaAnterior(hoy);
    if (estadisticas.fechaUltimaPractica === ayer) {
        estadisticas.racha++;
    } else if (estadisticas.fechaUltimaPractica) {
        if (usuario.inventario.protectoresRacha > 0 && estadisticas.fechaUltimaPractica === obtenerDiaAnterior(ayer)) {
            usuario.inventario.protectoresRacha--;
            estadisticas.racha++;
        } else {
            estadisticas.racha = 1;
        }
    } else {
        estadisticas.racha = 1;
    }

    estadisticas.fechaUltimaPractica = hoy;
}

function normalizarLiga(xp) {
    if (xp >= 3000) return 'oro';
    if (xp >= 1000) return 'plata';
    return 'bronce';
}

function prepararAvatares(usuario) {
    let modificado = false;
    if (!Array.isArray(usuario.avatares)) {
        usuario.avatares = [AVATAR_INICIAL_ID];
        modificado = true;
    } else if (!usuario.avatares.includes(AVATAR_INICIAL_ID)) {
        usuario.avatares.push(AVATAR_INICIAL_ID);
        modificado = true;
    }

    const avataresValidos = usuario.avatares.filter(avatarId =>
        avatarId === AVATAR_INICIAL_ID || obtenerAvatar(avatarId)
    );
    if (avataresValidos.length !== usuario.avatares.length) {
        usuario.avatares = avataresValidos;
        modificado = true;
    }

    if (!usuario.avatares.includes(usuario.avatar)) {
        usuario.avatar = AVATAR_INICIAL_ID;
        modificado = true;
    }

    return modificado;
}

function crearCursosIniciales() {
    return CURSOS_INICIALES.map(curso => ({ ...curso }));
}

// Obtiene los usuarios guardados o inyecta los 15 usuarios de prueba si está vacío.
export function obtenerUsuariosRegistrados() {
    let usuarios = JSON.parse(localStorage.getItem(USUARIOS_DB_KEY));

    if (!usuarios || usuarios.length === 0) {
        usuarios = [
            {
                "nombre": "Feliciano Ayala",
                "email": "felicianoayala@outlook.es",
                "password": "Admin123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "María Gómez",
                "email": "mariag@gmail.com",
                "password": "Pass123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Carlos Dev",
                "email": "carlos@outlook.com",
                "password": "Dev1234!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Estela Pérez",
                "email": "estela@gmail.com",
                "password": "Estela123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Pedro Picapiedra",
                "email": "pedro@yahoo.com",
                "password": "Pedro123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Sofía Lin",
                "email": "sofia.lin@gmail.com",
                "password": "Sofia123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Lucas Rossi",
                "email": "lucas.rossi@gmail.com",
                "password": "Lucas123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Valentina Ruiz",
                "email": "valentinaruiz@hotmail.com",
                "password": "Valu2026!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Mateo Fernández",
                "email": "mateof@outlook.com",
                "password": "Mateo1234!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Camila Torres",
                "email": "camila.torres@gmail.com",
                "password": "Cami2026!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Joaquín Benítez",
                "email": "joaquin.b@yahoo.com",
                "password": "Joaco123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Lucía Morales",
                "email": "luciamorales@gmail.com",
                "password": "Lucia123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Agustín Romero",
                "email": "agustindev@outlook.es",
                "password": "Agus1234!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Martina Silva",
                "email": "martu.silva@gmail.com",
                "password": "Martu123!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            },
            {
                "nombre": "Nicolás Castro",
                "email": "nico.castro@hotmail.com",
                "password": "Nico1234!",
                "estadisticas": { "racha": 0, "xp": 0, "liga": "bronce" }
            }
        ];
        usuarios.forEach(usuario => {
            usuario.cursos = crearCursosIniciales();
        });
        localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));
    }

    if (localStorage.getItem(DEMO_PROGRESS_RESET_KEY) !== DEMO_PROGRESS_RESET_VERSION) {
        usuarios.forEach(usuario => {
            if (!USUARIOS_DEMO_EMAILS.has(usuario.email)) return;

            usuario.cursos = (usuario.cursos || []).map(curso => ({
                ...curso,
                nivel: 'Inicial',
                progreso: 0
            }));
            usuario.progreso = {};
            usuario.estadisticas = { racha: 0, xp: 0, liga: 'bronce' };
        });

        localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));
        localStorage.setItem(DEMO_PROGRESS_RESET_KEY, DEMO_PROGRESS_RESET_VERSION);
    }

    if (localStorage.getItem(COURSE_ACCESS_MIGRATION_KEY) !== COURSE_ACCESS_MIGRATION_VERSION) {
        usuarios.forEach(usuario => {
            const cursosGuardados = Array.isArray(usuario.cursos) ? usuario.cursos : [];
            usuario.cursos = crearCursosIniciales().map(cursoInicial => {
                const cursoGuardado = cursosGuardados.find(curso => curso.id === cursoInicial.id);
                return cursoGuardado ? { ...cursoInicial, ...cursoGuardado } : cursoInicial;
            });

            if (usuario.progreso) {
                delete usuario.progreso.coreano;
            }
        });

        localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));
        localStorage.setItem(COURSE_ACCESS_MIGRATION_KEY, COURSE_ACCESS_MIGRATION_VERSION);
    }

    let usuariosMigrados = false;
    usuarios.forEach(usuario => {
        const emailNormalizado = normalizarEmail(usuario.email);
        if (usuario.email !== emailNormalizado) {
            usuario.email = emailNormalizado;
            usuariosMigrados = true;
        }
        usuariosMigrados = prepararAvatares(usuario) || usuariosMigrados;
        if (!usuario.inventario || typeof usuario.inventario !== 'object') {
            usuario.inventario = { protectoresRacha: 0, recargasVidas: 0 };
            usuariosMigrados = true;
        } else {
            if (!Number.isInteger(usuario.inventario.protectoresRacha)) {
                usuario.inventario.protectoresRacha = 0;
                usuariosMigrados = true;
            }
            if (!Number.isInteger(usuario.inventario.recargasVidas)) {
                usuario.inventario.recargasVidas = 0;
                usuariosMigrados = true;
            }
        }
        if (!usuario.estadisticas || typeof usuario.estadisticas !== 'object') {
            usuario.estadisticas = { xp: 0, xpDiaria: 0, fechaXpDiaria: '', racha: 0, liga: 'bronce' };
            usuariosMigrados = true;
        }
        if (!Number.isFinite(usuario.estadisticas.xp)) {
            usuario.estadisticas.xp = 0;
            usuariosMigrados = true;
        }
        if (!Number.isFinite(usuario.estadisticas.xpDiaria)) {
            usuario.estadisticas.xpDiaria = 0;
            usuariosMigrados = true;
        }
        if (typeof usuario.estadisticas.fechaXpDiaria !== 'string') {
            usuario.estadisticas.fechaXpDiaria = '';
            usuariosMigrados = true;
        }
        if (typeof usuario.estadisticas.fechaUltimaPractica !== 'string') {
            usuario.estadisticas.fechaUltimaPractica = '';
            usuariosMigrados = true;
        }
        if (!Number.isInteger(usuario.estadisticas.racha)) {
            usuario.estadisticas.racha = 0;
            usuariosMigrados = true;
        }
        const ligaNormalizada = normalizarLiga(usuario.estadisticas.xp ?? 0);
        if (usuario.estadisticas.liga !== ligaNormalizada) {
            usuario.estadisticas.liga = ligaNormalizada;
            usuariosMigrados = true;
        }
    });
    if (usuariosMigrados) {
        guardarUsuarios(usuarios);
    }

    return usuarios;
}

// Guarda un nuevo usuario en la "base de datos" local
export function registrarUsuario(nuevoUsuario) {
    const usuarios = obtenerUsuariosRegistrados();
    const nombreNormalizado = nuevoUsuario.nombre.trim().replace(/\s+/g, ' ');
    const emailNormalizado = normalizarEmail(nuevoUsuario.email);
    if (usuarios.some(user => normalizarEmail(user.email) === emailNormalizado)) return 'email-duplicado';
    if (usuarios.some(user => normalizarNombreUsuario(user.nombre) === normalizarNombreUsuario(nombreNormalizado))) {
        return 'nombre-duplicado';
    }

    const usuarioConEstructuraBase = {
        ...nuevoUsuario,
        nombre: nombreNormalizado,
        email: emailNormalizado,
        cursos: crearCursosIniciales(),
        estadisticas: {
            racha: 0,
            xp: 0,
            xpDiaria: 0,
            fechaXpDiaria: '',
            fechaUltimaPractica: '',
            liga: "bronce"
        },
        avatares: [AVATAR_INICIAL_ID],
        avatar: AVATAR_INICIAL_ID,
        inventario: { protectoresRacha: 0, recargasVidas: 0 }
    };
    usuarios.push(usuarioConEstructuraBase);
    guardarUsuarios(usuarios);
    return 'registrado';
}

export function comprarCursoCoreano(emailUsuario) {
    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === emailUsuario);

    if (!usuario) return 'usuario-no-encontrado';
    if (usuario.cursos.some(curso => curso.id === CURSO_COMPRABLE.id)) return 'ya-desbloqueado';

    const costo = 500;
    if ((usuario.estadisticas?.xp ?? 0) < costo) return 'xp-insuficiente';

    usuario.estadisticas.xp -= costo;
    usuario.cursos.push({ ...CURSO_COMPRABLE });
    guardarUsuarios(usuarios);
    return 'comprado';
}

export function comprarConsumible(emailUsuario, tipo) {
    const costo = COSTOS_CONSUMIBLES[tipo];
    if (!costo) return 'articulo-no-encontrado';

    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === normalizarEmail(emailUsuario));
    if (!usuario) return 'usuario-no-encontrado';
    if ((usuario.estadisticas?.xp ?? 0) < costo) return 'xp-insuficiente';

    usuario.estadisticas.xp -= costo;
    usuario.inventario[tipo === 'protectorRacha' ? 'protectoresRacha' : 'recargasVidas']++;
    guardarUsuarios(usuarios);
    return 'comprado';
}

export function comprarAvatar(emailUsuario, avatarId) {
    const avatar = obtenerAvatar(avatarId);
    if (!avatar) return 'avatar-no-encontrado';

    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === emailUsuario);

    if (!usuario) return 'usuario-no-encontrado';
    prepararAvatares(usuario);
    if (usuario.avatares.includes(avatarId)) return 'ya-adquirido';
    if ((usuario.estadisticas?.xp ?? 0) < COSTO_AVATAR) return 'xp-insuficiente';

    usuario.estadisticas.xp -= COSTO_AVATAR;
    usuario.avatares.push(avatarId);
    guardarUsuarios(usuarios);
    return 'comprado';
}

export function seleccionarAvatar(emailUsuario, avatarId) {
    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === emailUsuario);

    if (!usuario) return false;
    prepararAvatares(usuario);
    if (!usuario.avatares.includes(avatarId) || (avatarId !== AVATAR_INICIAL_ID && !obtenerAvatar(avatarId))) {
        return false;
    }

    usuario.avatar = avatarId;
    guardarUsuarios(usuarios);
    return true;
}

export function iniciarSesionLeccion(emailUsuario, idioma, unidad, checkpoint, paso) {
    const emailNormalizado = normalizarEmail(emailUsuario);
    const sesion = JSON.parse(sessionStorage.getItem(SESION_LECCION_KEY) || 'null');
    const mismaLeccion = sesion
        && sesion.email === emailNormalizado
        && sesion.idioma === idioma
        && sesion.unidad === unidad
        && sesion.checkpoint === checkpoint;

    if (mismaLeccion) {
        return sesion.paso === paso ? sesion : null;
    }
    if (paso !== 0) return null;

    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === emailNormalizado);
    if (!usuario) return null;

    const vidasExtra = usuario.inventario.recargasVidas > 0 ? 3 : 0;
    if (vidasExtra) {
        usuario.inventario.recargasVidas--;
        guardarUsuarios(usuarios);
    }

    const nuevaSesion = {
        email: emailNormalizado,
        idioma,
        unidad,
        checkpoint,
        paso: 0,
        vidas: 3 + vidasExtra
    };
    sessionStorage.setItem(SESION_LECCION_KEY, JSON.stringify(nuevaSesion));
    return nuevaSesion;
}

export function actualizarSesionLeccion(emailUsuario, paso, vidas) {
    const sesion = JSON.parse(sessionStorage.getItem(SESION_LECCION_KEY) || 'null');
    if (!sesion || sesion.email !== normalizarEmail(emailUsuario)) return false;

    sesion.paso = paso;
    sesion.vidas = vidas;
    sessionStorage.setItem(SESION_LECCION_KEY, JSON.stringify(sesion));
    return true;
}

export function cerrarSesionLeccion() {
    sessionStorage.removeItem(SESION_LECCION_KEY);
}

export function registrarCheckpointCompletado(emailUsuario, idioma, unidad, checkpoint) {
    const usuarios = obtenerUsuariosRegistrados();
    const usuario = usuarios.find(user => user.email === normalizarEmail(emailUsuario));
    const curso = usuario?.cursos?.find(item => item.id === idioma);
    const datosCurso = baseDeCursos[idioma];
    const datosCheckpoint = datosCurso?.unidades?.[unidad]?.checkpoints?.[checkpoint];
    if (!usuario || !curso || !datosCheckpoint) return { status: 'no-encontrado', xp: 0 };

    if (!usuario.progreso) usuario.progreso = {};
    if (!usuario.progreso[idioma]) usuario.progreso[idioma] = [];
    const idCheckpoint = `${unidad}-${checkpoint}`;
    if (usuario.progreso[idioma].includes(idCheckpoint)) {
        cerrarSesionLeccion();
        return { status: 'ya-completado', xp: 0 };
    }

    const checkpointsOrdenados = Object.entries(datosCurso.unidades)
        .flatMap(([idUnidad, datosUnidad]) =>
            Object.keys(datosUnidad.checkpoints).map(idCp => `${idUnidad}-${idCp}`)
        );
    const primerCheckpointPendiente = checkpointsOrdenados.find(id =>
        !usuario.progreso[idioma].includes(id)
    );
    if (primerCheckpointPendiente !== idCheckpoint) return { status: 'bloqueado', xp: 0 };

    const xpGanada = datosCheckpoint.pasos.reduce((total, paso) => total + paso.xp, 0);
    const hoy = obtenerFechaLocal();
    const estadisticas = usuario.estadisticas;
    if (estadisticas.fechaXpDiaria !== hoy) {
        estadisticas.fechaXpDiaria = hoy;
        estadisticas.xpDiaria = 0;
    }
    estadisticas.xp += xpGanada;
    estadisticas.xpDiaria += xpGanada;
    estadisticas.liga = normalizarLiga(estadisticas.xp);
    actualizarRacha(usuario, hoy);
    usuario.progreso[idioma].push(idCheckpoint);
    guardarUsuarios(usuarios);
    cerrarSesionLeccion();
    return { status: 'completado', xp: xpGanada };
}

export function guardarUsuarioActivo(emailUsuario) {
    localStorage.setItem(USUARIO_ACTIVO_KEY, emailUsuario);
}

export function obtenerUsuarioActivo() {
    return localStorage.getItem(USUARIO_ACTIVO_KEY);
}

export function cerrarSesion() {
    localStorage.removeItem(USUARIO_ACTIVO_KEY);
}

export function validarCredenciales(usuarioOEmail, password) {
    const usuarios = obtenerUsuariosRegistrados();
    const identificador = usuarioOEmail.trim();
    const usuarioEncontrado = usuarios.find(user =>
        (user.email === normalizarEmail(identificador)
            || normalizarNombreUsuario(user.nombre) === normalizarNombreUsuario(identificador))
        && user.password === password
    );
    return usuarioEncontrado || null;
}

export function actualizarPassword(usuarioOEmail, nuevaPassword) {
    const usuarios = obtenerUsuariosRegistrados();
    const indice = usuarios.findIndex(user => user.email === normalizarEmail(usuarioOEmail));

    if (indice === -1) {
        return false; // No se encontró el usuario
    }

    usuarios[indice].password = nuevaPassword;
    guardarUsuarios(usuarios);

    return true; // Éxito
}