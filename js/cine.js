// js/cine.js
import { db } from './firebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function renderizarDetalleCine() {
    const params = new URLSearchParams(window.location.search);
    const idCine = params.get('id');
    const contenedor = document.getElementById('contenido-interno');

    try {
        const docSnap = await getDoc(doc(db, "cines", idCine));
        if (docSnap.exists()) {
            const cine = docSnap.data();
            
            contenedor.innerHTML = `
                <br/><h1>${cine.RazonSocial}</h1><br/>
                <div class="contenido-cine">
                    <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
                    <div class="datos-cine">
                        <h4>Dirección:</h4><span>${cine.Direccion}</span><br/><br/>
                        <h4>Teléfono:</h4><span>${cine.Telefonos}</span>
                    </div>
                </div>
                <div class="cine-info">
                    <p>Contamos con salas ${cine.Salas || 'digitales'} y formatos ${cine.Formatos || '2D'}.</p>
                </div>`;
        }
    } catch (e) { console.error(e); }
}
renderizarDetalleCine();