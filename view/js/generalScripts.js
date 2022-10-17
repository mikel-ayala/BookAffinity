$(document).ready(load)

function load() {
    $("#header").load("./view/html/header.html", () => {
        $('#logo').on('click', goToMain);
        $('#buscador').on('click', bookSearcher);
        $('#logout').on('click', logout);

    });
    $("#footer").load("./view/html/footer.html");
    loggedVerify();
}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}
function bookSearcher(event) {
    preventClick(event);
    $(".tituloLibro").map((i, libro)=>{(libro.textContent.toUpperCase().indexOf($('#titlePiece').val().toUpperCase())>-1)
    ?$('#libro'+i).show():$('#libro'+i).hide()});
}

function goToMain(event) {
    preventClick(event)
    window.location.href="index.html"
}

function logout(event) {
    preventClick(event);
    let url = "controller/controllerLogout.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        window.location.href = "login.html";
    });
}

function loggedVerify() {
    let url = "controller/controllerLoggedVerify.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        if(result.error!="logged" && !window.location.href.includes('login') ){ 
            window.location.href = "login.html";
        }else if(result.error=="logged" && window.location.href.includes('login')){
            window.location.href = "index.html";
        }
    });
}
