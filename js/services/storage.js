// js/services/storage.js

const USUARIOS_DB_KEY = 'usuariosRegistrados';
const USUARIO_ACTIVO_KEY = 'usuarioActivo';

// Obtiene todos los usuarios guardados en el localStorage (o un array vacío si no hay ninguno)
export function obtenerUsuariosRegistrados() {
    const usuariosJSON = localStorage.getItem(USUARIOS_DB_KEY);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

// Guarda un nuevo usuario en la "base de datos" local
export function registrarUsuario(nuevoUsuario) {
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioConEstructuraBase = {
        ...nuevoUsuario,
        cursos: [
            { id: "ingles", nombre: "Inglés", bandera: "../img/reino-unido.png", nivel: "Inicial", progreso: 0 },
            { id: "aleman", nombre: "Alemán", bandera: "../img/alemania.png", nivel: "Inicial", progreso: 0 },
            { id: "chino", nombre: "Chino", bandera: "../img/china.png", nivel: "Inicial", progreso: 0 },
            { id: "coreano", nombre: "Coreano", bandera: "../img/corea-del-sur.png", nivel: "Inicial", progreso: 0 }
        ],
        estadisticas: {
            racha: 0,
            xp: 0,
            liga: "bronce"
        }
    };
    usuarios.push(usuarioConEstructuraBase);
    localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));
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

    // CORRECCIÓN: Se reemplazó user.correo por user.email
    const usuarioEncontrado = usuarios.find(user =>
        (user.email === usuarioOEmail) && user.password === password
    );

    return usuarioEncontrado || null;
}

export function actualizarPassword(usuarioOEmail, nuevaPassword) {
    const usuarios = obtenerUsuariosRegistrados();

    // CORRECCIÓN: Se reemplazó user.correo por user.email
    const indice = usuarios.findIndex(user => user.email === usuarioOEmail);

    if (indice === -1) {
        return false; // No se encontró el usuario
    }

    usuarios[indice].password = nuevaPassword;
    localStorage.setItem(USUARIOS_DB_KEY, JSON.stringify(usuarios));

    return true; // Éxito
}