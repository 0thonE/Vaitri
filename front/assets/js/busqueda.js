// import { load_new_trivia } from './createTrivia.js';

let trivias=[];

let btnBusqueda = document.getElementsByClassName('btn btn-white btn-round btn-just-icon')[0];            
btnBusqueda.addEventListener("click", buscar);
console.log(btnBusqueda);

let htmlBody = document.getElementsByClassName('container-fluid')[1];


function create_trivia_card(id,_title,_description,_answ_ppl,_state,_img ) {
    let title=(_title)?_title:"Titulo Trivia";
    let description=(_description)?_description:"";
    let state=(_state)?"La trivia esta activa":"Esta trivia se ha cerrado";
    let state_icon=(_state)?"access_time":"highlight_off";
    let img=(_img)?_img:"../assets/img/image_placeholder.jpg";

    let trivia_card=`
        <div class="col-md-4">
          <div class="card card-product card-trivia" >
            <div class="card-header card-header-image" data-header-animation="true">
              <a href="#pablo">
                <img class="img" src="${img}">
              </a>
            </div>
            <div class="card-body">
              <div class="card-actions text-center">
                <button type="button" class="btn btn-danger btn-link fix-broken-card">
                  <i class="material-icons">build</i> Fix Header!
                </button>
                <button type="button" class="btn btn-default btn-link view-trivia" rel="tooltip" data-placement="bottom"
                  title="" data-original-title="Ver" aria-describedby="tooltip700396" onclick="">
                  <i class="material-icons">art_track</i>
                </button>
                <button type="button" class="btn btn-success btn-link edit-trivia" rel="tooltip" data-placement="bottom"
                  title="" data-original-title="Editar">
                  <i class="material-icons">visibility</i>
                </button>
              </div>
              <h4 class="card-title">
                <a href="#pablo">${title}</a>
              </h4>
              <div class="card-description">
                ${description}
              </div>
            </div>
            <div class="card-footer">
              <div class="stats">
                <i class="material-icons">${state_icon}</i> ${state}
              </div>
              <div class="stats">
                <p class="card-category"><i class="material-icons">person</i>${_answ_ppl} personas respondieron</p>
              </div>
            </div>
          </div>
        </div>`;
    
    let template = document.createElement('div');
    template.innerHTML=trivia_card;

    let trivias_board=document.querySelectorAll('.content .row')[0];
    
    trivias_board.appendChild(template.children[0]);

    
    let last_el_index=trivias_board.children.length-1;

    let t_card=trivias_board.children[last_el_index];
    
    let last_view_button=trivias_board.querySelectorAll('.view-trivia')[last_el_index];
    last_view_button.addEventListener('click',(event)=>{
        trivias_board.click();
        view_triviaTokens(id);
        // document.querySelector('#unclicker').click();
    });
    let last_edit_button=trivias_board.querySelectorAll('.edit-trivia')[last_el_index];
    last_edit_button.addEventListener('click',(event)=>{
        view_trivia(id);
    });

    
        
}


function view_triviaTokens(id) {
    remove_tooltips();
    sessionStorage.setItem('triviaId',id);
    window.location.replace("./results.html");
}

function view_trivia(id) {
    remove_tooltips();
    let triv=trivias.find(t=>{
        return t._id===id
    
    })
    sessionStorage.setItem('editTrivia',JSON.stringify(triv));

    window.location.replace('./edit-trivia.html');
}


function remove_tooltips() {
    let body=document.querySelector('body');
    let tooltips=document.querySelectorAll('.tooltip');
    tooltips.forEach(element => {
        body.removeChild(element)
    });

}

function formatParams( params ){
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
  }

function buscar(event) {
  event.preventDefault();
  let name= document.getElementsByClassName('form-control')[0].value;
  console.log('name: ' + name);
  create_new_triviaDashboard(name);

}

function create_new_triviaDashboard(name){

  let triviaShow = document.querySelector('.triviaRow');
  triviaShow.innerHTML = ""


    let params={
        owner:JSON.parse(sessionStorage.getItem("user"))._id,
    }

    if(name)
        params.name=name;

    
    console.log(params);

    console.log(formatParams(params));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/trivias'+formatParams(params));
    // xhr.setRequestHeader('content-type','application/json');
    xhr.setRequestHeader('Authorization',sessionStorage.getItem("token"));
    xhr.send();
    xhr.onload = function(){
        if(xhr.status != 200){
            alert(xhr.status+ ': '+ xhr.statusText + "\n Un error ha ocurrido.");
        }else{
            // alert(xhr.status+ ': '+ xhr.statusText + "\n Exitoso");

            let response = JSON.parse(xhr.responseText);
            console.log(response);
            trivias=response.results;
            console.log(trivias);
            trivias.forEach(e => {
                create_trivia_card(e._id,e.name,e.description,"",true,);
            });
            
        }
    }

    
   
}


create_new_triviaDashboard();