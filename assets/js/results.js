let tokens=[
    {
        token:"ASD586F46SA5DF4"
    },
    {
        token:"6S5DFSDF514A364"
    },
    {
        token:"EF5T4NYYEFA5T84"
    },
    {
        token:"QJ3WKUWJWRTHHET"
    },
    {
        token:"J4NH4JYRWYRNJTY"
    },
]

let answers=[
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"QJ3WKUWJWRTHHET",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"QJ3WKUWJWRTHHET",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"QJ3WKUWJWRTHHET",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"QJ3WKUWJWRTHHET",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
    {
        id:365534,
        token:"6S5DFSDF514A364",
        username:"username",
        date:new Date(),
        score:20
    },
]

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

function addParticipant(participant) {
    
    let time=`${participant.date.getHours()}:${participant.date.getMinutes()}`;
    let date_format=
        `${participant.date.getDate()}/${participant.date.getMonth()}/${participant.date.getFullYear()}`;

    let row=`
        <tr>
            <td>
                ${participant.id}
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
    
    let row_participant = document.querySelector(`.tok-${participant.token} tbody`);

    row_participant.innerHTML+=row;
    
        
}

function createToken(id) {
    // 20/02/2345
    let picker_start=document.querySelectorAll('.modal-body .datepicker')[0];
    let picker_end=document.querySelectorAll('.modal-body .datepicker')[1];
    let start=picker_start.value;
    let end=picker_end.value;
    picker_start.classList.remove("invalid");
    picker_end.classList.remove("invalid");
    if(start.lenght===0&&end.lenght===0) {
        picker_start.classList.add("invalid");
        picker_end.classList.add("invalid");
        return;
    }
    let startDate=new Date(start.substr(6,9),start.substr(3,4),start.substr(0,1))
    let endDate=new Date(end.substr(6,9),end.substr(3,4),end.substr(0,1))

    // send to db



}

function view_results(){
    tokens.forEach(e => {
        create_token_card(e.token);
        let this_answers=answers.filter(a=> a.token==e.token )
        this_answers.forEach(a => {
            addParticipant(a)
        });
    });
}


view_results();