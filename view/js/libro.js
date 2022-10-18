$(document).ready(load)

function load() {
    mostrarInfoLibro(), mostrarValoraciones();
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
        
    }).catch(error => console.error("Error status:", error));
}

function mostrarValoraciones() {
    let url = "controller/controllerValoracion.php"

    fetch(url, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{
        
        let valoraciones = result.valoraciones;
        let estructura = '';
        let estrellas;

        for (let i = 0; i < valoraciones.length; i++) {

            switch (parseInt(valoraciones[i]['valoracion'])) {
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
            
            estructura += '<article class="review">' +
                                '<img class="perfil" src="" alt="">' +
                                '<article class="info">' +
                                    '<b>' + valoraciones[i]['idUsuario'] + '</b>' +
                                    '<div id="estrellas">' +
                                        estrellas +
                                        '<b> ' + valoraciones[i]['edad'] + ' urte</b>' +
                                    '</div>' +
                                    '<p>' + valoraciones[i]['comentario'] + '<b> ' + valoraciones[i]['idioma'] + '</b></p>' +
                                    '<button class="erantzuna"><b>Erantzuna eman</b></button>' +
                                '</article>' +
                            '</article>';
            
        }

        $('#list').html(estructura);
        
    }).catch(error => console.error("Error status:", error));
}

function scrollear() {
    document.getElementById('containerSnap').scrollTo(0, 1000, 'smooth');
}