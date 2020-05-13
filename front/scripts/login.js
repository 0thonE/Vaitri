let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", register);

function register(event) {


    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_check = document.getElementById("password2").value;
    let password_input = document.getElementById("password2");

    if(password != password_check) {
        password_input.setCustomValidity("Las contraseñas no coinciden.");
        return;
    }
    
    
    event.preventDefault();
    
    let str = JSON.stringify({
            "firstname" : '',
            "lastname" : '',
            "acerca" : '',
            "trivia": [],
            "username": username,
            "email": email,
            "password": password

    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/user');
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(str);
    xhr.onload = function(){
        if(xhr.status != 201){
            alert(xhr.status+ ': '+ xhr.statusText + "\n Un error ha ocurrido.");
        }else{
        alert(xhr.status+ ': '+ xhr.statusText + "\nUsuario creado, ya puede hacer login!");
            location.href = '../examples/login.html';
        }
    }

}

function login(evt) {
    
    let email = document.getElementById('email_login').value;
    let password = document.getElementById('password_login').value;
    let str = JSON.stringify({
        'email' : email,
        'password':password
    });

    if(document.querySelectorAll("input:invalid").length == 0) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST','/api/login');

        xhr.setRequestHeader('content-type','application/json');
        
        xhr.onload = ()=>{
            if(xhr.status != 200){
                alert(xhr.status+ ': '+ xhr.statusText + "\nUn error ha ocurrido, vuelva a intentarlo.");
            }else{
                let response = JSON.parse(xhr.responseText);
                sessionStorage.setItem("token",response.token);
                sessionStorage.setItem("user",JSON.stringify(response.User));
                location.href = "../examples/dashboard.html";
                // alert(xhr.status+ ': '+ xhr.statusText + "\nLogin exitoso! Bienvenido!");
            }
        }
        xhr.send(str);
    }
}

function verify(token){

}


function init(){
    let token = sessionStorage.getItem("token");
    let user = JSON.parse(sessionStorage.getItem("user"));
    if(sessionStorage.token){
        window.location = '../dashboard.html';
    };
}

init();
