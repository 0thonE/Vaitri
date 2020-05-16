// let tokens=[
//     {
//         token:"ASD586F46SA5DF4"
//     },
//     {
//         token:"6S5DFSDF514A364"
//     },
//     {
//         token:"EF5T4NYYEFA5T84"
//     },
//     {
//         token:"QJ3WKUWJWRTHHET"
//     },
//     {
//         token:"J4NH4JYRWYRNJTY"
//     },
// ]

let trivia_tokens=[];
let trivia_answers=[];

// let answers=[
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"QJ3WKUWJWRTHHET",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"QJ3WKUWJWRTHHET",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"QJ3WKUWJWRTHHET",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"QJ3WKUWJWRTHHET",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
//     {
//         id:365534,
//         token:"6S5DFSDF514A364",
//         username:"username",
//         date:new Date(),
//         score:20
//     },
// ]

let success_btn=document.querySelector('.modal-footer .btn.btn-primary.btn-success')
success_btn.addEventListener('click',()=>createToken());

function create_token_card(token) {

    let token_card=`
        <div class="offset-md-1 col-md-10">
          <div class="card tok-${token}">
            <div class="card-header card-header-primary">
              <h4 class="card-title mt-0">Token: ${token}<span class="token"></span></h4>
              <p class="card-category">Estos son los resultados </p>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="">
                    <th></th>
                    <th>
                      Usuario
                    </th>
                    <th>
                      Fecha
                    </th>
                    <th>
                      Hora inicio
                    </th>
                    <th>
                      Puntaje
                    </th>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;

    let template = document.createElement('div');
    template.innerHTML=token_card;

    let token_card_list=document.querySelector('.content .row');

    token_card_list.appendChild(template.children[0]);

}

function addParticipant(participant,id) {
    let dateData=new Date(participant.date)

    let time=`${dateData.getHours()}:${dateData.getMinutes()}`;
    let date_format=
        `${dateData.getDate()}/${dateData.getMonth()}/${dateData.getFullYear()}`;
        
        // ${participant._id}
    let row=`
        <tr>
            <td>
                ${id}
            </td>
            <td>
                ${participant.username}
            </td>
            <td>
                ${date_format}
            </td>
            <td>
                ${time}
            </td>
            <td>
                ${participant.score}
            </td>
        </tr>`;

    let row_participant = document.querySelector(`.tok-${participant.trivia_token} tbody`);

    row_participant.innerHTML+=row;


}

function createToken() {

    let picker_start=document.querySelectorAll('.modal-body .datepicker')[0];
    let picker_end=document.querySelectorAll('.modal-body .datepicker')[1];
    let start=picker_start.value;
    let end=picker_end.value;
    picker_start.classList.remove("invalid");
    picker_end.classList.remove("invalid");
    if(start.lenght===0)
    picker_start.classList.add("invalid");
    if(end.lenght===0) {
        picker_end.classList.add("invalid");
        return;
    }
    if(start.lenght===0)
        return

    // let startDate=new Date(start.substr(6,9),start.substr(3,4),start.substr(0,1));
    let startDate=new Date(start.substr(6,9),start.substr(3,2),start.substr(0,2));
    let endDate=new Date(end.substr(6,9),end.substr(3,2),end.substr(0,2));
    // let endDate=new Date(end.substr(6,9),end.substr(3,4),end.substr(0,1));
    console.log(startDate);
    console.log(endDate);

    // let currentTriviaId=JSON.parse(sessionStorage.getItem('currentTrivia')).id;
    let currentUser=JSON.parse(sessionStorage.getItem('user'));
    let triviaId=sessionStorage.getItem('triviaId');

    let trivia_tokenObj={
        trivia:triviaId,
        dateStart:startDate,
        dateStart:startDate,
        dateEnd:endDate,
        owner:currentUser._id,
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/trivia_token');
    xhr.setRequestHeader('content-type','application/json');
    xhr.setRequestHeader('Authorization',sessionStorage.getItem("token"));
    xhr.send(JSON.stringify(trivia_tokenObj));
    xhr.onload = function(){
        if(xhr.status != 201){
            alert(xhr.status+ ': '+ xhr.statusText + "\n Un error ha ocurrido.");
        }else{
            view_results();
            let close_btn=document.querySelector('.modal-footer .btn.btn-secondary.btn-danger')
            close_btn.click();
        }
    }


    // send to db



}


function formatParams( params ){
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
  }

function view_results(){
    let token_card_list=document.querySelector('.content .row');
    token_card_list.innerHTML="";

    let triviaId=sessionStorage.getItem('triviaId');

    // state the query for the answers

    let answ_params={
        trivia:triviaId,
    }

    console.log(answ_params);

    let xhr_answ = new XMLHttpRequest();
    xhr_answ.open('GET', '/api/answers'+formatParams(answ_params));
    xhr_answ.setRequestHeader('Authorization',sessionStorage.getItem("token"));
    xhr_answ.onload = function(){
        if(xhr_answ.status != 200){
            alert(xhr_answ.status+ ': '+ xhr_answ.statusText + "\n Un error ha ocurrido.");
        }else{
            // alert(xhr_answ.status+ ': '+ xhr_answ.statusText + "\n Exitoso");
            let response = JSON.parse(xhr_answ.responseText);
            console.log(response);
            trivia_answers=response.results;
            console.log(trivia_answers);
            trivia_tokens.forEach(e => {
                create_token_card(e._id);
                let this_answers=trivia_answers.filter(a=> a.trivia_token==e._id )
                this_answers.forEach((a,index) => {
                    addParticipant(a,index+1)
                });
            });

        }
    }

    let params={
        trivia:triviaId,
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
            trivia_tokens=response.results;
            console.log(trivia_tokens);
            xhr_answ.send();

        }
    }




}


view_results();