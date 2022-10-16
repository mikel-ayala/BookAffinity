$(document).ready(load)

function load() {
    setLibrosAprobados();

}

var libros;

function setLibrosAprobados() {
    var url = "controller/controllerIndex.php";

	fetch(url, {method: 'GET'})
        .then(res => res.json()).then(result => {

            let containerLibros = document.getElementById('listaLibros');

            libros = result.libros;

            let htmlList = "";
            let estrellas = "";
            
            for (let i = 0; i < libros.length; i++) {
            
                switch (parseInt(libros[i]["valoracion"])) {
                    case 1:
                        estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                        break;
                    case 2:
                        estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                        break;
                    case 3:
                        estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                        break;
                    case 4:
                        estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span>';
                        break;
                    case 5:
                        estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span>';
                        break;
                    default:
                        estrellas = '<span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                        break;
                };

                htmlList += '<article class="libro" onclick="cambiarPagina(' + libros[i]['idLibro'] + ')">' +
                    '<img src="' + libros[i]["foto"] + '" alt="">' +
                    '<div class="infoLibro">' + 
                        '<h2>' + libros[i]["titulo"] + '</h2>' +
                        '<b>' + libros[i]["autor"] + '</b>' + 
                        '<p>' + libros[i]["formato"].toUpperCase() + '</p>' +
                        '<div class="estrellas">' 
                            + estrellas +
                            '<p>(' + libros[i]["numeroLectores"] + ')</p>' +
                        '</div>' + 
                    '</div>' +
                '</article>';
               
            };

            containerLibros.innerHTML = htmlList;
        })
	    .catch(error => console.error('Error status:', error));	
}


function cambiarPagina(id) {
    let libroSeleccionado = libros[id-1];
    let url = "controller/controllerCookie.php";
    data = {'libro':libroSeleccionado}
    console.log(libroSeleccionado)

    fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    }).then(res=>res.text()).then(response=>{
        window.location.href="libro.html";
    }).catch(error=>console.error('Error status:',error))
}
