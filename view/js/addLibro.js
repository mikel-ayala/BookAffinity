
document.getElementById("boton").addEventListener("click",validar);

function validar(){

    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var foto = document.getElementById("foto").value;
    var formato = document.getElementById("formato").value;
    var sinopsis = document.getElementById("sinopsis").value;
    var idioma = document.getElementById("idioma").value;
    
    

    var booll = true;

    if(titulo ==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(autor==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(foto==""){
        adocument.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(formato==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    }
    if(sinopsis ==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(idioma==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
   return booll;
}

