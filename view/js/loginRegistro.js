$(document).ready(load)

function load() {
    $('#login').click(loggin);
}

function preventClick() {
    event.preventDefault();
    event.stopPropagation();
}

function loggin() {
    preventClick();
    var url = "controller/controllerLogin.php";
   	
	var data = {'usuario':$('#usuario').val(), 'contraseina':$('#contraseina').val()};

	fetch(url, {
	  method: 'POST', 
	  body: JSON.stringify(data), 
	  headers:{'Content-Type': 'application/json'}  
	})
	.then(res => res.json()).then(result => {            
            if (result.error){
                window.location.href = "index.html";
        	} else {
				window.location.href = "login.html";
        	}
	})
	.catch(error => console.error('Error status:', error));	
}