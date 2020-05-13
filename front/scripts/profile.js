let users = [];

let updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click",updateUser);

function updateUser(e) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let email = document.getElementById("email").value;//user.email;
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let username = document.getElementById("username").value;
    let acercademi = document.getElementById("acercademi").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    let password_validation = document.getElementById("password2");

    if(password != password2) {
        password_validation.setCustomValidity("Las contraseñas coinciden.");
        return;
    }
           
    e.preventDefault();

    let str = JSON.stringify({
        'firstname' : firstname,
        'lastname' : lastname,
        'username' : username,
        'password' : password,
        'acerca' : acercademi
    })

    console.log(acercademi);

    let xhr = new XMLHttpRequest();

    xhr.open('PATCH', '/api/user/' + email);

    xhr.setRequestHeader('content-type','application/json');
    xhr.setRequestHeader('Authorization',sessionStorage.getItem("token"));

    xhr.send(str);
    xhr.onload = function(){
        if(xhr.status != 200){
            alert(xhr.status+ ': '+ xhr.statusText + "/n Un error ha ocurrido.");
        }else{
            let response = JSON.parse(xhr.responseText);
            sessionStorage.setItem("user",JSON.stringify(response.result));
            location.href = '../examples/user.html';
        }
    }

}

function writeInfo(usr) {
    if(usr != undefined) {
        document.getElementById("username").value = usr.username;
        document.getElementById("email").value = usr.email;
        document.getElementById("firstname").value = usr.firstname;
        document.getElementById("lastname").value = usr.lastname;
        document.getElementById("acercademi").value = usr.acerca;
        document.getElementById("password").value = usr.password;
    } else {
        alert(xhr.status+ ': '+ xhr.statusText + "/n Un error ha ocurrido");
    }
}

function init(){
    let token = sessionStorage.getItem("token");
    let user = JSON.parse(sessionStorage.getItem("user"));
    writeInfo(user);
}

init();