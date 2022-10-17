$(document).ready(load)

function load() {
    $('#login').click(loggin);

	$('#signUp').on('click',() => {		
		preventClick(event)
		$('#container').addClass("right-panel-active")
	})

	$('#signIn').on('click',() => {
		preventClick(event)
		$('#container').removeClass("right-panel-active")})

	$('#typeIkaslea').bind('click', showForm);
	$('#typeIrakaslea').bind('click', showForm);
}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function loggin(event) {
    preventClick(event);

	if($('#usuarioLogin').val()!='' && $('#contraseinaLogin').val()!=''){	
		var url = "controller/controllerLogin.php";
		var data = {'usuario':$('#usuarioLogin').val(), 'contraseina':$('#contraseinaLogin').val()};
		fetch(url, {
		method: 'POST', 
		body: JSON.stringify(data), 
		headers:{'Content-Type': 'application/json'}  
		})
		.then(res => res.json()).then(result => {            
				if (result.error=="No error"){
					window.location.href = "index.html";
				} else {
					$('#msgError').html('<i class="fa-solid fa-triangle-exclamation"></i> '+result.error)
				}
		})
		.catch(error => console.error('Error status:', error));	
	}else{
		$('#msgError').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak')

	}
}

function showForm(event) {
	preventClick(event)
	$('.signUpForm').hide();
	$('#'+this.value).show();
}
