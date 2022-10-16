$(document).ready(load)

function load() {
    $("#header").load("./view/html/header.html");
    $("#footer").load("./view/html/footer.html");
    loggedVerify()
}

function loggedVerify() {
    let url = "controller/controllerLoggedVerify.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        console.log(result)
    })

}
