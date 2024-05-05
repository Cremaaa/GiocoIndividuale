import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import Stats from './script/stats.js';
import * as GL from "./script/global.js"
import { App } from './script/app.js';

// Funzione per mostrare la schermata di caricamento
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = '#000';
    loadingScreen.style.color = '#fff';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.innerText = 'Loading...';
    document.body.appendChild(loadingScreen);
    return loadingScreen;
}

const app = new App();
const loadingScreen = showLoadingScreen();

function hideLoadingScreen() {
    document.body.removeChild(loadingScreen);
}

let DT;
let lastTS = 0;
//Loop principale del gioco. 
function mainLoop(TS) {
    requestAnimationFrame(mainLoop);
    DT = TS - lastTS;
    lastTS = TS;
    app.loop(DT);
}


setTimeout(() => {
    hideLoadingScreen();
    app.init();
    app.game.setupSkyBox();
    mainLoop()
}, 4000);

// Resto del codice per gli eventi
window.addEventListener("keydown", (e) => {
    if (e.key === "w") GL.keys.FORWARD = true;
    if (e.key === "s") GL.keys.BACKWARD = true;
    if (e.key === "a") GL.keys.LEFT = true;
    if (e.key === "d") GL.keys.RIGHT = true;
    if (e.key === " ") app.game.player.fallSpeed = -0.3;
})

window.addEventListener("keyup", (e) => {
    if (e.key === "w") GL.keys.FORWARD = false;
    if (e.key === "s") GL.keys.BACKWARD = false;
    if (e.key === "a") GL.keys.LEFT = false;
    if (e.key === "d") GL.keys.RIGHT = false;
})

document.addEventListener('click', function (event) {
    if (event.button === 0) { 
        app.game.player.shoot();
        app.game.pool.requestMike(app.game.player.position.x, app.game.player.position.y, app.game.player.position.z+5);
    }
});
