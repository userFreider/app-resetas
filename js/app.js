




//funcion iniciar proyecto
function iniciarApp() {

    //mis variables
    const selectCatgoria = document.querySelector('#categorias')
    selectCatgoria.addEventListener('change', seleccionarCategoria);


    const resultado = document.querySelector('#resultado');


    ObtenerCategorias();


    //obtenerCategoria
    function ObtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarCategoria(resultado.categories))
    }

    //mostrarCategoria en un arreglo
    function mostrarCategoria(categorias = []) {

        //iterar mi arreglo
        categorias.forEach(categoria => {

            const { strCategory } = categoria; //destructuracion
            const options = document.createElement('OPTION'); //crear elemnto
            options.value = strCategory //capturo mi categoria
            options.textContent = strCategory // 
            selectCatgoria.appendChild(options) // muestro mis categoria

        })

    }

    //tomar valores 
    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria} `//selecionar categoria de forma dinamica
        console.log(url)
        //capturar con fecht
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarResetas(resultado.meals))
    }


    function mostrarResetas(recetas = []) {
        //iterar los resultado
        recetas.forEach(receta => {

            const { idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');

            recetaImagen.alt = `Imagen de la receta${strMeal}`;
            recetaImagen.src = strMealThumb;


            //crear otro div
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.textContent = strMeal;


            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';


            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);
            //inyectar contenido html
            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            //le agregamos la inyeccion de forma dinamica
            resultado.appendChild(recetaContenedor)

       

            console.log(recetaHeading)

        })

    }


}



document.addEventListener('DOMContentLoaded', iniciarApp);