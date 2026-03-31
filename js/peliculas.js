import { db } from './firebaseConfig.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function renderizarPeliculas() {
    const params = new URLSearchParams(window.location.search);
    const idCat = params.get('id'); // Detecta si es 'cartelera' o 'estrenos'
    const contenedor = document.getElementById('contenido-interno');

    try {
        
        const q = query(collection(db, "peliculas"), where("idCategoria", "==", idCat));
        const querySnapshot = await getDocs(q);

        
        let estructuraHTML = `<br/><h1>${idCat === 'estrenos' ? 'Próximos Estrenos' : 'Cartelera'}</h1><br/>`;

        if (querySnapshot.empty) {
            estructuraHTML += "<p>No hay películas disponibles.</p>";
        }

        
        querySnapshot.forEach((doc) => {
            const peli = doc.data();
            
            // Usamos += para ir pegando cada bloque de película
            estructuraHTML += `
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${peli.Titulo}</h2><br/>
                        <p>${peli.Sinopsis}</p>
                        <br/>
                        <div class="boton-pelicula"> 
                            <a href="pelicula.html?id=${doc.id}">
                                <img src="img/varios/btn-mas-info.jpg" width="120" height="30">
                            </a>
                        </div>
                        <div class="boton-pelicula"> 
                            <a href="https://www.youtube.com/watch?v=${peli.Link}" target="_blank">
                                <img src="img/varios/btn-trailer.jpg" width="120" height="30">
                            </a>
                        </div> 
                    </div>
                    <img src="img/pelicula/${peli.id}.jpg" width="160" height="226" onerror="this.src='img/varios/logo-cinestar.png'"/>
                    <br/><br/>
                </div>
            `;
        });

        
        contenedor.innerHTML = estructuraHTML;

    } catch (error) {
        console.error("Error al generar el contenido:", error);
    }
}

renderizarPeliculas();