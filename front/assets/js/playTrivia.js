

function playTrivia_controls() {
    let btn_juega_tr = document.querySelector('#btn_juega_trivia');
    let token_input = document.querySelector('.token-input');
    let username_input = document.querySelector('.username-input');

    if(btn_juega_tr)btn_juega_tr.addEventListener('click', () => {
        if(token_input.value===""||username_input.value==="")
            return;
        setTriviaData(token_input.value);
    });

    token_input.addEventListener('change',()=>{
        render_imagePreview(token_input.value);
    })

}

function render_imagePreview(token) {
    console.log('render');
}


function formatParams( params ){
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
}


function setTriviaData(token) {



    let user_input = document.querySelector('.username-input');
    sessionStorage.setItem('pUser',JSON.stringify({name:user_input.value}));

    let xhr_triv = new XMLHttpRequest();
    xhr_triv.onload = function(){
        if(xhr_triv.status != 200){
            alert(xhr_triv.status+ ': '+ xhr_triv.statusText + "\n Un error ha ocurrido.");
        }else{
            // alert(xhr_triv.status+ ': '+ xhr_triv.statusText + "\n Exitoso");

            let response = JSON.parse(xhr_triv.responseText);
            console.log(response);
            trivia=response.results[0];
            console.log(trivia);
            sessionStorage.setItem('pTrivia',JSON.stringify(trivia));
            window.location.replace("./jugando.html");
            
        }
    }
    
    let params={
        _id:token,
    }

    console.log(formatParams(params));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/trivia_tokens'+formatParams(params));
    xhr.setRequestHeader('Authorization',sessionStorage.getItem("token"));
    xhr.send();
    xhr.onload = function(){
        if(xhr.status != 200){
            alert(xhr.status+ ': '+ xhr.statusText + "\n Un error ha ocurrido.");
        }else{
            // alert(xhr.status+ ': '+ xhr.statusText + "\n Exitoso");

            let response = JSON.parse(xhr.responseText);
            console.log(response);
            let trivia_token=response.results[0];
            console.log(trivia_token);
            sessionStorage.setItem('pToken',JSON.stringify(trivia_token));

            let paramsTrivia={
                _id:trivia_token.trivia,
            }
            console.log(formatParams(paramsTrivia));
            xhr_triv.open('GET', '/api/trivias'+formatParams(paramsTrivia));
            xhr_triv.send();
        }
    }

}


playTrivia_controls();
