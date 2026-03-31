// js/pelicula.js
import { db } from './firebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function renderizarDetallePelicula() {
    const params = new URLSearchParams(window.location.search);
    const idPeli = params.get('id');
    const contenedor = document.getElementById('contenido-interno');

    if (!idPeli) return;

    try {
        const docSnap = await getDoc(doc(db, "peliculas", idPeli));
        if (docSnap.exists()) {
            const peli = docSnap.data();
            
            contenedor.innerHTML = `
                <br/><h1>Detalle de la Película</h1><br/>
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${peli.Titulo}</h2>
                        <p>${peli.Sinopsis}</p>
                        <br/>
                        <div class="tabla">
                            <div class="fila"><div class="celda-titulo">Estreno:</div><div class="celda">${peli.Estreno || 'Próximamente'}</div></div>
                            <div class="fila"><div class="celda-titulo">Género:</div><div class="celda">${peli.Genero || 'Acción'}</div></div>
                            <div class="fila"><div class="celda-titulo">Director:</div><div class="celda">${peli.Director || 'N/A'}</div></div>
                        </div>
                    </div>
                    <img src="img/pelicula/${peli.id}.jpg" width="160" height="226">
                </div>
                <div class="pelicula-video">
                    <iframe width="580" height="400" src="https://www.youtube.com/embed/${peli.Link}" frameborder="0" allowfullscreen></iframe>
                </div>`;
        }
    } catch (e) { console.error(e); }
}
renderizarDetallePelicula();