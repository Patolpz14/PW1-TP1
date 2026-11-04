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

// js/services/storage.js

export function obtenerUsuariosRegistrados() {
    let usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados'));

    // Si el localStorage está vacío, inyectamos los 15 usuarios de prueba automáticamente
    if (!usuarios || usuarios.length === 0) {
        usuarios = [
            {
                "nombre": "Feliciano Ayala",
                "email": "felicianoayala@outlook.es",
                "password": "Admin123!",
                "cursos": [{ "id": "ingles", "nombre": "Inglés", "bandera": "../img/reino-unido.png", "nivel": "Inicial", "progreso": 10 }],
                "estadisticas": { "racha": 3, "xp": 450, "liga": "bronce" }
            },
            {
                "nombre": "María Gómez",
                "email": "mariag@gmail.com",
                "password": "Pass123!",
                "cursos": [{ "id": "ingles", "nombre": "Inglés", "bandera": "../img/reino-unido.png", "nivel": "Intermedio", "progreso": 40 }],
                "estadisticas": { "racha": 7, "xp": 850, "liga": "bronce" }
            },
            {
                "nombre": "Carlos Dev",
                "email": "carlos@outlook.com",
                "password": "Dev1234!",
                "cursos": [{ "id": "aleman", "nombre": "Alemán", "bandera": "../img/alemania.png", "nivel": "Inicial", "progreso": 15 }],
                "estadisticas": { "racha": 2, "xp": 610, "liga": "bronce" }
            },
            {
                "nombre": "Estela Pérez",
                "email": "estela@gmail.com",
                "password": "Estela123!",
                "cursos": [{ "id": "chino", "nombre": "Chino", "bandera": "../img/china.png", "nivel": "Inicial", "progreso": 10 }],
                "estadisticas": { "racha": 5, "xp": 460, "liga": "bronce" }
            },
            {
                "nombre": "Pedro Picapiedra",
                "email": "pedro@yahoo.com",
                "password": "Pedro123!",
                "cursos": [{ "id": "coreano", "nombre": "Coreano", "bandera": "../img/corea-del-sur.png", "nivel": "Inicial", "progreso": 5 }],
                "estadisticas": { "racha": 1, "xp": 305, "liga": "bronce" }
            },
            {
                "nombre": "Sofía Lin",
                "email": "sofia.lin@gmail.com",
                "password": "Sofia123!",
                "cursos": [{ "id": "chino", "nombre": "Chino", "bandera": "../img/china.png", "nivel": "Avanzado", "progreso": 80 }],
                "estadisticas": { "racha": 14, "xp": 1520, "liga": "plata" }
            },
            {
                "nombre": "Lucas Rossi",
                "email": "lucas.rossi@gmail.com",
                "password": "Lucas123!",
                "cursos": [{ "id": "aleman", "nombre": "Alemán", "bandera": "../img/alemania.png", "nivel": "Intermedio", "progreso": 50 }],
                "estadisticas": { "racha": 9, "xp": 1340, "liga": "plata" }
            },
            {
                "nombre": "Valentina Ruiz",
                "email": "valentinaruiz@hotmail.com",
                "password": "Valu2026!",
                "cursos": [{ "id": "coreano", "nombre": "Coreano", "bandera": "../img/corea-del-sur.png", "nivel": "Inicial", "progreso": 25 }],
                "estadisticas": { "racha": 4, "xp": 980, "liga": "plata" }
            },
            {
                "nombre": "Mateo Fernández",
                "email": "mateof@outlook.com",
                "password": "Mateo1234!",
                "cursos": [{ "id": "ingles", "nombre": "Inglés", "bandera": "../img/reino-unido.png", "nivel": "Avanzado", "progreso": 95 }],
                "estadisticas": { "racha": 22, "xp": 2750, "liga": "oro" }
            },
            {
                "nombre": "Camila Torres",
                "email": "camila.torres@gmail.com",
                "password": "Cami2026!",
                "cursos": [{ "id": "chino", "nombre": "Chino", "bandera": "../img/china.png", "nivel": "Intermedio", "progreso": 60 }],
                "estadisticas": { "racha": 18, "xp": 2400, "liga": "oro" }
            },
            {
                "nombre": "Joaquín Benítez",
                "email": "joaquin.b@yahoo.com",
                "password": "Joaco123!",
                "cursos": [{ "id": "aleman", "nombre": "Alemán", "bandera": "../img/alemania.png", "nivel": "Inicial", "progreso": 30 }],
                "estadisticas": { "racha": 6, "xp": 390, "liga": "bronce" }
            },
            {
                "nombre": "Lucía Morales",
                "email": "luciamorales@gmail.com",
                "password": "Lucia123!",
                "cursos": [{ "id": "ingles", "nombre": "Inglés", "bandera": "../img/reino-unido.png", "nivel": "Inicial", "progreso": 20 }],
                "estadisticas": { "racha": 4, "xp": 320, "liga": "bronce" }
            },
            {
                "nombre": "Agustín Romero",
                "email": "agustindev@outlook.es",
                "password": "Agus1234!",
                "cursos": [{ "id": "coreano", "nombre": "Coreano", "bandera": "../img/corea-del-sur.png", "nivel": "Intermedio", "progreso": 45 }],
                "estadisticas": { "racha": 11, "xp": 1150, "liga": "plata" }
            },
            {
                "nombre": "Martina Silva",
                "email": "martu.silva@gmail.com",
                "password": "Martu123!",
                "cursos": [{ "id": "aleman", "nombre": "Alemán", "bandera": "../img/alemania.png", "nivel": "Avanzado", "progreso": 85 }],
                "estadisticas": { "racha": 15, "xp": 2100, "liga": "oro" }
            },
            {
                "nombre": "Nicolás Castro",
                "email": "nico.castro@hotmail.com",
                "password": "Nico1234!",
                "cursos": [{ "id": "chino", "nombre": "Chino", "bandera": "../img/china.png", "nivel": "Inicial", "progreso": 15 }],
                "estadisticas": { "racha": 2, "xp": 280, "liga": "bronce" }
            }
        ];
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
    }

    return usuarios;
}