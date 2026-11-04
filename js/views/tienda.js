// js/views/tienda.js
import { obtenerUsuarioActivo, obtenerUsuariosRegistrados, cerrarSesion } from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. VALIDACIÓN DE SESIÓN (Seguridad)
    // Si alguien entra a tienda.html sin loguearse, lo pateamos al index
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }

    // 2. CONEXIÓN CON LA BASE DE DATOS
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.email === usuarioActivo);

    if (!usuarioActual) {
        window.location.href = 'index.html';
        return;
    }

    // 3. SELECCIÓN DEL DOM
    const textoRacha = document.querySelector('#racha-dias');
    const barraMeta = document.querySelector('#meta-progreso');
    const textoMeta = document.querySelector('#meta-texto');
    const textoSaldo = document.querySelector('#saldo-actual');
    const botonesComprar = document.querySelectorAll('.btn-comprar');

    // 4. FUNCIÓN PARA ACTUALIZAR LA PANTALLA
    const actualizarInterfaz = () => {
        // Leemos los datos reales desde usuarioActual.estadisticas
        if (textoRacha) textoRacha.innerText = `${usuarioActual.estadisticas.racha} Días`;
        if (textoSaldo) textoSaldo.innerText = `${usuarioActual.estadisticas.xp} XP`;

        // Como la meta diaria es visual por ahora, la dejamos en un valor estático 
        // hasta que implementemos la lógica de jugar lecciones reales.
        const metaActual = 30;
        const metaTotal = 50;
        if (textoMeta) textoMeta.innerText = `${metaActual} / ${metaTotal} XP`;
        if (barraMeta) barraMeta.value = metaActual;
    };

    // 5. LÓGICA DE COMPRA DEFINITIVA
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const costo = parseInt(boton.getAttribute('data-costo'));

            // Validamos contra la XP real del usuario
            if (usuarioActual.estadisticas.xp >= costo) {
                // Descontamos el valor
                usuarioActual.estadisticas.xp -= costo;

                // ACTUALIZAMOS LA BASE DE DATOS LOCAL
                // Buscamos la posición de este usuario en el array general
                const index = usuarios.findIndex(user => user.nombre === usuarioActivoNombre);
                if (index !== -1) {
                    // Reemplazamos los datos viejos con los nuevos
                    usuarios[index] = usuarioActual;

                    // Guardamos el array completo nuevamente en el localStorage
                    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

                    alert('¡Compra exitosa! Se ha descontado la XP de tu cuenta.');
                    actualizarInterfaz();
                }
            } else {
                alert('No tenés suficiente XP. ¡Seguí practicando para ganar más!');
            }
        });
    });

    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarSesion();
            window.location.href = 'index.html';
        });
    }


    // 6. INICIALIZACIÓN
    actualizarInterfaz();
});