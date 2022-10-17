$(document).ready(load)

function load() {
    $("#header").load("./view/html/header.html", () => {
        $('#logo').on('click', goToMain);
    });
    $("#footer").load("./view/html/footer.html");
    loggedVerify();
}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function goToMain(event) {
    preventClick(event)
    window.location.href="index.html"
}

function loggedVerify() {
    let url = "controller/controllerLoggedVerify.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        console.log(result)
    });
}
