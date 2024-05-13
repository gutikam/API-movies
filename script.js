let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", async () => {
    if (pagina < 1000) {
        pagina += 1;
        await obtenerPeliculas();
    }
})

btnAnterior.addEventListener("click", async () => {
    if (pagina > 1) {
        pagina -= 1;
        await obtenerPeliculas();
    }
})

const obtenerPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5c775389c73a0b2a2bc815d05093528&language=es-MX&page=${pagina}`);
        console.log(respuesta);

        if (respuesta.ok) {
            const datos = await respuesta.json();

            let peliculasHTML = "";

            datos.results.forEach(pelicula => {
                peliculasHTML += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>`;
            });

            document.getElementById("contenedor").innerHTML = peliculasHTML;
        } else if (respuesta.status === 401) {
            console.log("Clave de API incorrecta");
        } else if (respuesta.status === 404) {
            console.log("Página no encontrada");
        } else {
            console.log("Hubo un error inesperado");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

obtenerPeliculas();