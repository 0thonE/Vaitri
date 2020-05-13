

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

function createTimeline(arr) {
    let timeline=document.querySelector('.card.card-timeline.card-plain ul.timeline');
    
    arr.forEach(e => {
        timeline.innerHTML+=
            render_timeline_card(e.title,e.token,e.dateStart,e.dateEnd);
    });

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
                    ${dateStart} - ${dateEnd}
                </h6>
            </div>
        </li>`;  
    return timeline_card;  
}


createTimeline(programed);