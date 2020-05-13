

let inverted=true;

let programed=[
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
        
    },
    {
        title:"Titulo1",
        token:"KJ3GB323",
        dateStart:"11/05/2020",
        dateEnd:"13/05/2020",
    },
];

let programed_tokens=[];
let trivias=[];


function formatParams( params ){
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
  }


// function createTimeline(arr) {
function createTimeline() {

    
    let params={
        owner:JSON.parse(sessionStorage.getItem("user"))._id,
    }

    console.log(formatParams(params));
    let xhr_trivias = new XMLHttpRequest();
    xhr_trivias.open('GET', '/api/trivias'+formatParams(params));
    // xhr_trivias.setRequestHeader('content-type','application/json');
    xhr_trivias.onload = function(){
        if(xhr_trivias.status != 200){
            alert(xhr_trivias.status+ ': '+ xhr_trivias.statusText + "\n Un error ha ocurrido.");
        }else{
            // alert(xhr_trivias.status+ ': '+ xhr_trivias.statusText + "\n Exitoso");

            let response = JSON.parse(xhr_trivias.responseText);
            console.log(response);
            trivias=response.results;
            console.log(trivias);

            
            let timeline=document.querySelector('.card.card-timeline.card-plain ul.timeline');
            console.log(timeline);
            // arr.forEach(e => {
            programed_tokens.forEach(e => {
                let currentTrivia=trivias.find(trivia=>trivia._id===e.trivia)
                timeline.innerHTML+=
                    render_timeline_card((currentTrivia)?currentTrivia.name:undefined,
                        e._id,e.dateStart,e.dateEnd);
            });
            
        }
    }

    console.log(formatParams(params));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/trivia_tokens'+formatParams(params));
    // xhr.setRequestHeader('content-type','application/json');
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
            programed_tokens=trivia_tokens;
            console.log(programed_tokens);
            xhr_trivias.send();

        }
    }



}

let id=0;

function render_timeline_card(triviaTitle,token,dateStart,dateEnd) {
    let timeline_side=(inverted)?"timeline-inverted":"";
    inverted=!inverted;
    let card_theme="primary";

    switch (Math.floor(Math.random() * 5)) {
        case 0:
            card_theme="danger";
            break;
        case 1:
            card_theme="success";
            break;
        case 2:
            card_theme="info";
            break;
        case 3:
            card_theme="warning";
            break;
    }

    let tTitle=(triviaTitle)?triviaTitle.toUpperCase():"NOMBRE TRIVIA";
    let tkn=(token)?token.toUpperCase():"###########";

    let timeline_card=`
        <li class="${timeline_side}">
            <div class="timeline-badge ${card_theme}">
                <i class="material-icons">extension</i>
            </div>
            <div class="timeline-panel">
                <div class="timeline-heading">
                    <span class="badge badge-pill badge-${card_theme}">${tTitle}</span>
                </div>
                <div class="timeline-body">
                    <div class="alert alert-${card_theme}">
                        <span><b> TOKEN - </b> ${tkn}</span>
                    </div>
                </div>
                <h6 class="date-frame">
                    del: ${dateStart} 
                    al:  ${dateEnd}
                </h6>
            </div>
        </li>`;  
    return timeline_card;  
}


createTimeline();
// createTimeline(programed);