//mis variables
const selectCatgoria = document.querySelector('#categorias')





//funcion iniciar proyecto
function iniciarApp() {

    ObtenerCategorias();


    //obtenerCategoria
    function ObtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then(respuesta =>  respuesta.json())
            .then(resultado => mostrarCategoria(resultado.categories))
    }

     //mostrarCategoria en un arreglo
     function mostrarCategoria( categorias = [] ){
        //iterar mi arreglo
        categorias.forEach(categoria => {
            const options = document.createElement('OPTION'); //crear elemnto
            options.value = categoria.strCategory //capturo mi categoria
            options.textContent =  categoria.strCategory // 
            selectCatgoria.appendChild(options) // ,uestro mis categoria
            
        })

     }


}



document.addEventListener('DOMContentLoaded', iniciarApp);