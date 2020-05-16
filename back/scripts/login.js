let users = [];

let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", register);

function register(event) {

    let firstname = ''
    let lastname = ''
    let trivia = []
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_check = document.getElementById("password2").value;
    let password_input = document.getElementById("password2");

    if(password != password_check) {
        password_input.setCustomValidity("Las contraseñas no son iguales.");
        return;
    }
    
    
    event.preventDefault();

    let str = JSON.stringify({
            
            //'firstname': firstname,
            //'lastname': lastname,
            "username": username,
            "email": email,
            "password": password

    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/user');
    xhr.setRequestHeader('content-type','application/json');
    xhr.setRequestHeader('Authorization',sessionStorage.getItem("token"));
    xhr.send(str);
    xhr.onload = function(){
        if(xhr.status != 201){
            alert(xhr.status+ ': '+ xhr.statusText + "\n Un error ha ocurrido.");
        }else{
            alert(xhr.status+ ': '+ xhr.statusText + "\n Creado.");
            location.href = 'jugando.html';
        }
    }

}