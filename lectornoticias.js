const contenedor = document.getElementById('contenedor-noticias');
const btnRefrescar = document.getElementById('btnRefrescar');
const API_URL = "https://api.spaceflightnewsapi.net/v4/articles/";

async function obtenerNoticias() {
  contenedor.innerHTML = '<p class="loader">Cargando noticias...</p>';
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error en la petición a la API');
    const datos = await respuesta.json();
    mostrarNoticias(datos.results);
  } catch (error) {
    contenedor.innerHTML = `<p class="loader">No se pudieron cargar las noticias </p>`;
  }
}

function mostrarNoticias(noticias) {
  if (!noticias || noticias.length === 0) {
    contenedor.innerHTML = `<p class="loader">No hay noticias disponibles.</p>`;
    return;
  }
  const noticiasAleatorias = noticias.sort(() => Math.random() - 0.5).slice(0, 6);

  contenedor.innerHTML = noticiasAleatorias.map(noticia => `
    <article class="noticia">
      <img src="${noticia.image_url || 'https://via.placeholder.com/400x200?text=Sin+imagen'}" alt="Imagen de noticia">
      <div class="contenido">
        <h2>${noticia.title}</h2>
        <p>${noticia.summary || 'Sin descripción disponible.'}</p>
        <a href="${noticia.url}" target="_blank">Leer más</a>
      </div>
    </article>
  `).join('');
}

btnRefrescar.addEventListener('click', obtenerNoticias);
obtenerNoticias();
