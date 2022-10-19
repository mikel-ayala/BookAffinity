$(document).ready(load)
var formatos=[];
function load() {
    setLibrosAprobados();
    setAutores();
    $('label').on('click', checkboxColor);
    slideOne();
    slideTwo();
    $('.checkboxFormato').on('change', filterType);
}

var libros;

function filterType(event) {
    preventClick(event);
    self = this
    if ($(this).is(':checked')) {
        formatos.push(this.id);
        $(".formatoLibro").map((i, libro)=>{
            for (let j = 0; j < formatos.length; j++) {
                if(libro.textContent.toUpperCase().indexOf(formatos[j].toUpperCase())>-1){
                    $('#libro'+i).show();
                    $('#libro'+i).attr( "display-"+formatos[j],true)
                }else if($('#libro'+i).attr( "display-"+formatos[j-1])){
                    $('#libro'+i).attr( "display-"+formatos[j],false)
                }else{
                    $('#libro'+i).hide()
                    $('#libro'+i).attr( "display-"+formatos[j],false)

                }
            }
   
        });
    }else{
        const index = formatos.indexOf(this.id);
        if (index > -1) { 
            formatos.splice(index, 1); 
        }
        

        $(".formatoLibro").map((i, libro)=>{
            if(formatos.length>0){
                console.log(formatos, self.id);
                for (let j = 0; j < formatos.length; j++) {
                    if(libro.textContent.toUpperCase().indexOf(self.id.toUpperCase())>-1){
                        $('#libro'+i).hide()
                        $('#libro'+i).attr("display-"+self.id,false)
                    }                 
                }
            }else{
                if($('#libro'+i).attr( "display-searcher")){
                    $('#libro'+i).show();
                } 
            }
            
           
                
        });
        
    }

}

function setLibrosAprobados() {
    var url = "controller/controllerIndex.php";

	fetch(url, {method: 'GET'})
        .then(res => res.json()).then(result => {

            let containerLibros = document.getElementById('listaLibros');

            libros = result.libros;

            $('.numeroLibros').text(libros.length);

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

                htmlList += '<article id="libro'+i+'" class="libro" onclick="cambiarPagina(' + libros[i]["idLibro"] + ')">' +
                    '<img src="' + libros[i]["foto"] + '" alt="">' +
                    '<div class="infoLibro" value="' + libros[i]["edadMedia"] + '">' + 
                        '<h2 id="title'+i+'" class="tituloLibro">' + libros[i]["titulo"] + '</h2>' +
                        '<p class="autorLibro"><b>' + libros[i]["autor"] + '</b></p>' + 
                        '<p class="formatoLibro parrafo">' + libros[i]["formato"].toUpperCase() + '</p>' +
                        '<div class="estrellas">' 
                            + estrellas +
                            '<p class="parrafo">(' + libros[i]["numeroLectores"] + ')</p>' +
                        '</div>' + 
                    '</div>' +
                '</article>';
            };

            containerLibros.innerHTML = htmlList;

            $('#buscador').click();

        }).catch(error => console.error('Error status:', error));	

}

function setAutores() {
    var url = "controller/controllerAutor.php";

    fetch(url, {method: 'GET'})
        .then(res => res.json()).then(result => {

            autores = result.autores;
            let htmlList = '<option value="0" selected>Idazle bat aukeratu.</option>';
            
            for (let i = 0; i < autores.length; i++) {
                htmlList += '<option value="' + autores[i] + '">' + autores[i] + '</option>'
            };

            $('#select').html(htmlList);

        }).catch(error => console.error('Error status:', error));	
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



function checkboxColor() {
    var color = $(this).next().css('color');
      if (color == 'rgb(177, 177, 177)') {
        $(this).next().addClass('grey');
      }
      else { 
        $(this).next().removeClass('grey');
      }
}



let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}

function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}

function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3386FF ${percent1}% , #3386FF ${percent2}%, #dadae5 ${percent2}%)`;
}