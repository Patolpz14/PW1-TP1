export const AVATARES = [
    { id: 'explorador', nombre: 'Explorador', icono: '🧑‍🚀', color: '#dbeafe' },
    { id: 'exploradora', nombre: 'Exploradora', icono: '👩‍🚀', color: '#ede9fe' },
    { id: 'zorro', nombre: 'Zorro', icono: '🦊', color: '#ffedd5' },
    { id: 'gato', nombre: 'Gato', icono: '🐱', color: '#fce7f3' },
    { id: 'perro', nombre: 'Perro', icono: '🐶', color: '#fef3c7' },
    { id: 'panda', nombre: 'Panda', icono: '🐼', color: '#e5e7eb' },
    { id: 'koala', nombre: 'Koala', icono: '🐨', color: '#e0f2fe' },
    { id: 'tigre', nombre: 'Tigre', icono: '🐯', color: '#ffedd5' },
    { id: 'leon', nombre: 'León', icono: '🦁', color: '#fef3c7' },
    { id: 'rana', nombre: 'Rana', icono: '🐸', color: '#dcfce7' },
    { id: 'mono', nombre: 'Mono', icono: '🐵', color: '#fed7aa' },
    { id: 'conejo', nombre: 'Conejo', icono: '🐰', color: '#fce7f3' },
    { id: 'oso', nombre: 'Oso', icono: '🐻', color: '#e7d5c5' },
    { id: 'unicornio', nombre: 'Unicornio', icono: '🦄', color: '#f3e8ff' },
    { id: 'robot', nombre: 'Robot', icono: '🤖', color: '#cffafe' },
    { id: 'alien', nombre: 'Alien', icono: '👽', color: '#d9f99d' },
    { id: 'estrella', nombre: 'Estrella', icono: '🤩', color: '#fef9c3' },
    { id: 'genio', nombre: 'Genio', icono: '🧞', color: '#ccfbf1' },
    { id: 'mago', nombre: 'Mago', icono: '🧙', color: '#e0e7ff' },
    { id: 'artista', nombre: 'Artista', icono: '🧑‍🎨', color: '#ffe4e6' },
    { id: 'cientifica', nombre: 'Científica', icono: '👩‍🔬', color: '#d1fae5' },
    { id: 'piloto', nombre: 'Piloto', icono: '🧑‍✈️', color: '#dbeafe' },
    { id: 'chef', nombre: 'Chef', icono: '🧑‍🍳', color: '#ffedd5' },
    { id: 'deportista', nombre: 'Deportista', icono: '🧑‍🎤', color: '#fce7f3' }
];

export function obtenerAvatar(id) {
    return AVATARES.find(avatar => avatar.id === id) ?? null;
}
