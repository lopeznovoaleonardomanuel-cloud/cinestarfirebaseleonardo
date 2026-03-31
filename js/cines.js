import { db } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function renderizarCines() {
    const contenedor = document.getElementById('contenido-interno');
    
    try {
        const querySnapshot = await getDocs(collection(db, "cines"));
        let estructuraHTML = `<br/><h1>Nuestros Cines</h1><br/>`;

        querySnapshot.forEach((doc) => {
            const cine = doc.data();
            
            estructuraHTML += `
                <div class="contenido-cine">
                    <img src="img/cine/${cine.id}.1.jpg" width="227" height="170" onerror="this.src='img/varios/logo-cinestar.png'"/>
                    <div class="datos-cine">
                        <h4>${cine.RazonSocial}</h4><br/>
                        <span>${cine.Direccion} - ${cine.Distrito}<br/><br/>Teléfono: ${cine.Telefonos}</span>
                    </div>
                    <br/>
                    <a href="cine.html?id=${doc.id}">
                        <img src="img/varios/ico-info2.png" width="150" height="40"/>
                    </a>
                </div>`;
        });

        contenedor.innerHTML = estructuraHTML;
    } catch (error) {
        console.error(error);
    }
}
renderizarCines();