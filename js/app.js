




//funcion iniciar proyecto
function iniciarApp() {

    //mis variables
    const selectCatgoria = document.querySelector('#categorias')
    selectCatgoria.addEventListener('change', seleccionarCategoria);

    const resultado = document.querySelector('#resultado');
    const modal = new bootstrap.Modal('#modal', {});


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
        //impiar html
        limpiarHtml(resultado);

        const heading = document.createElement('h2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultado' : 'No Hay Resultado';
        resultado.appendChild(heading);

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

            //mostrar  id food
            recetaButton.onclick = function () {
                seleccionarReceta(idMeal)
            }


            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);
            //inyectar contenido html
            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            //le agregamos la inyeccion de forma dinamica
            resultado.appendChild(recetaContenedor)



        })

    }

    //seleccionar receta 

    function seleccionarReceta(id) {
        const url = ` https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]))
    }

    //mostrar receta modal
    function mostrarRecetaModal(receta) {


        const { idMeal, strMeal, strInstructions, strMealThumb, } = receta;

        const Modaltitle = document.querySelector('.modal .modal-title');
        const ModalBody = document.querySelector('.modal .modal-body');

        Modaltitle.textContent = strMeal;
        ModalBody.innerHTML =
            `
                    <img src="${strMealThumb} " alt="recetas" class="img-fluid" ${strMeal}>
                    <h3>Instrucciones</h3>
                    <p>${strInstructions}</p> 
                `;



        modal.show();

    }



    //funcion limpiar html
    function limpiarHtml(selector) {
        while (selector.firstChild) {
            selector.removeChild(resultado.firstChild);
        }
    }


}



document.addEventListener('DOMContentLoaded', iniciarApp);