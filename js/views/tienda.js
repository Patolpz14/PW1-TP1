// js/views/tienda.js
import { AVATARES } from '../models/avatares.js';
import {
    comprarAvatar,
    comprarCursoCoreano,
    comprarConsumible,
    COSTO_AVATAR,
    obtenerUsuarioActivo,
    obtenerUsuariosRegistrados,
    obtenerXpDiaria,
    cerrarSesion
} from '../services/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. VALIDACIÓN DE SESIÓN (Seguridad)
    const usuarioActivo = obtenerUsuarioActivo();
    if (!usuarioActivo) {
        window.location.href = 'index.html';
        return;
    }

    // 2. CONEXIÓN CON LA BASE DE DATOS
    const usuarios = obtenerUsuariosRegistrados();
    const usuarioActual = usuarios.find(user => user.email === usuarioActivo);

    if (!usuarioActual) {
        cerrarSesion();
        window.location.href = 'index.html';
        return;
    }

    // 3. SELECCIÓN DEL DOM
    const textoRacha = document.querySelector('#racha-dias');
    const barraMeta = document.querySelector('#meta-progreso');
    const textoMeta = document.querySelector('#meta-texto');
    const textoSaldo = document.querySelector('#saldo-actual');
    const textoProtectores = document.getElementById('cantidad-protectores');
    const textoRecargas = document.getElementById('cantidad-recargas');
    const tarjetaCoreano = document.getElementById('curso-coreano');
    const botonCoreano = document.getElementById('btn-comprar-coreano');
    const grillaAvatares = document.getElementById('grilla-avatares');
    const botonesComprar = document.querySelectorAll('.btn-comprar:not(#btn-comprar-coreano)');

    // 4. FUNCIÓN PARA ACTUALIZAR LA PANTALLA
    const actualizarInterfaz = () => {
        if (textoRacha) textoRacha.innerText = `${usuarioActual.estadisticas?.racha ?? 0} Días`;
        if (textoSaldo) textoSaldo.innerText = `${usuarioActual.estadisticas?.xp ?? 0} XP`;
        if (textoProtectores) textoProtectores.textContent = usuarioActual.inventario.protectoresRacha;
        if (textoRecargas) textoRecargas.textContent = usuarioActual.inventario.recargasVidas;

        const metaTotal = 50;
        const xpDiaria = obtenerXpDiaria(usuarioActual);
        if (textoMeta) textoMeta.innerText = `${xpDiaria} / ${metaTotal} XP`;
        if (barraMeta) barraMeta.value = Math.min(xpDiaria, metaTotal);
    };

    if (usuarioActual.cursos.some(curso => curso.id === 'coreano') && tarjetaCoreano) {
        tarjetaCoreano.hidden = true;
    }

    if (botonCoreano) {
        botonCoreano.addEventListener('click', () => {
            const resultado = comprarCursoCoreano(usuarioActivo);

            if (resultado === 'xp-insuficiente') {
                alert('Necesitas 500 XP para desbloquear el curso de Coreano.');
                return;
            }
            if (resultado === 'ya-desbloqueado') {
                if (tarjetaCoreano) tarjetaCoreano.hidden = true;
                return;
            }
            if (resultado !== 'comprado') {
                alert('No se pudo completar la compra. Vuelve a iniciar sesión e inténtalo de nuevo.');
                return;
            }

            usuarioActual.estadisticas.xp -= 500;
            if (tarjetaCoreano) tarjetaCoreano.hidden = true;
            actualizarInterfaz();
            alert('¡Curso de Coreano desbloqueado! Ya puedes comenzarlo desde Mis Cursos.');
        });
    }

    function renderizarAvataresDisponibles() {
        if (!grillaAvatares) return;
        grillaAvatares.innerHTML = '';

        AVATARES
            .filter(avatar => !usuarioActual.avatares.includes(avatar.id))
            .forEach(avatar => {
                const tarjeta = document.createElement('article');
                tarjeta.classList.add('tarjeta-tienda', 'tarjeta-avatar');

                const muestra = document.createElement('div');
                muestra.classList.add('muestra-avatar');
                muestra.style.backgroundColor = avatar.color;
                muestra.textContent = avatar.icono;
                muestra.setAttribute('aria-hidden', 'true');

                const nombre = document.createElement('h3');
                nombre.textContent = avatar.nombre;

                const boton = document.createElement('button');
                boton.type = 'button';
                boton.classList.add('btn-comprar');
                boton.textContent = `Comprar por ${COSTO_AVATAR} XP`;
                boton.addEventListener('click', () => {
                    const resultado = comprarAvatar(usuarioActivo, avatar.id);

                    if (resultado === 'xp-insuficiente') {
                        alert(`Necesitas ${COSTO_AVATAR} XP para comprar este avatar.`);
                        return;
                    }
                    if (resultado !== 'comprado') {
                        alert('No se pudo completar la compra. Actualiza la página e inténtalo de nuevo.');
                        return;
                    }

                    usuarioActual.estadisticas.xp -= 10;
                    usuarioActual.avatares.push(avatar.id);
                    renderizarAvataresDisponibles();
                    actualizarInterfaz();
                });

                tarjeta.append(muestra, nombre, boton);
                grillaAvatares.appendChild(tarjeta);
            });
    }

    // 5. LÓGICA DE COMPRA DEFINITIVA
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const articulo = boton.dataset.articulo;
            const resultado = comprarConsumible(usuarioActivo, articulo);
            if (resultado === 'xp-insuficiente') {
                alert('No tenés suficiente XP para comprar este artículo.');
                return;
            }
            if (resultado !== 'comprado') {
                alert('No se pudo completar la compra. Actualiza la página e inténtalo de nuevo.');
                return;
            }

            usuarioActual.estadisticas.xp -= articulo === 'protectorRacha' ? 200 : 50;
            usuarioActual.inventario[articulo === 'protectorRacha' ? 'protectoresRacha' : 'recargasVidas']++;
            actualizarInterfaz();
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
    renderizarAvataresDisponibles();
    actualizarInterfaz();
});