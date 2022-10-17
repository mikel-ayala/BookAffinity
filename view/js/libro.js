$(document).ready(load)

function load() {
    mostrarInfoLibro();
    $('#navegar').on('click', scrollear);
}

function mostrarInfoLibro() {

    let url = "controller/controllerLibro.php"

    fetch(url, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{

        let libroSeleccionado = result.libroSeleccionado;

        document.title = libroSeleccionado['titulo'] + ' | JLCLUB';
        $(".titulo").text(libroSeleccionado['titulo']);
        $(".autor").text(libroSeleccionado['autor']);
        $("#fotoLibro").attr('src', libroSeleccionado['foto']);
        $("#valoracion").text(libroSeleccionado['valoracion']);
        switch (parseInt(libroSeleccionado['valoracion'])) {
            case 1:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');
                break;
            case 2:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');               
                break;
            case 3:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');                
                break;
            case 4:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span>');                
                break;
            case 5:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span>');                
                break;
            default:
                $(".estrellas").html('<span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');                
                break;
        };
        $("#formato").text(libroSeleccionado['formato'].toUpperCase());
        $("#sinopsis").text(libroSeleccionado['sinopsis']);
        $(".numeroLectores").text(libroSeleccionado['numeroLectores']);
        $("#edadMedia").text(libroSeleccionado['edadMedia']);
        $("#tituloIdiomas").text(libroSeleccionado['tituloIdiomas']);
        
    }).catch(error => console.error("Error status:", error))
}

function scrollear() {
    document.getElementById('containerSnap').scrollTo(0, 400, 'smooth');
}