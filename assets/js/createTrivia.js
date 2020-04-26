
function pointsSelection() {
    let inputs_points=document.querySelectorAll('.points-selection input[name="point"]');

    inputs_points.forEach((element) => {
        element.addEventListener('change', event=>{
            let choices=document.querySelectorAll('.points-selection .choice');
            choices.forEach(e => {
                e.classList.remove("active");
                if(e.classList.contains(event.target.value))e.classList.add("active");
            });
        });
    });

    let icon_points=document.querySelectorAll('.points-selection .icon');
    console.log(icon_points);
    icon_points.forEach((element,index) => {
        console.log(element);
        element.addEventListener('click',(event)=>{
            inputs_points[index].click()
        })
    });

}

let questions_list=[];

function createTrivia_controls() {
    let new_question_btn=document.querySelectorAll('.questions-side_bar .btn-new_question');
    
    new_question_btn.forEach((element) => {
        element.addEventListener('click', event=>{
            let question=create_question_element();
            questions_list.push(question);
            let question_card=`
                <div class="col-md-12">
                    <div class="card card-product">
                    <div class="card-header card-header-image" data-header-animation="true">
                        <a href="#">
                            <img class="question_img" src="../assets/img/image_placeholder.jpg">
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="card-actions text-center">
                        <button type="button" class="btn btn-danger btn-link fix-broken-card">
                            <i class="material-icons">build</i> Fix Header!
                        </button>
                        <button type="button" class="btn btn-success btn-link btn_edit_question" rel="tooltip" data-placement="bottom"
                            title="" data-original-title="Editar">
                            <i class="material-icons">edit</i>
                        </button>
                        <button type="button" class="btn btn-danger btn-link btn_delete_question" rel="tooltip" data-placement="bottom"
                            title="" data-original-title="Borrar" aria-describedby="tooltip571092">
                            <i class="material-icons">delete_outline</i>
                        </button>
                        </div>
                        <h4 class="card-title">
                        <a class="question_text" href="#">tu pregunta</a>
                        </h4>
                        <div class="card-description">
                        &nbsp;
                        </div>
                    </div>
                    </div>
                </div>`;
            let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
            question_cards_list.innerHTML+=question_card;
        });

        
        
    });

    let icon_points=document.querySelectorAll('.points-selection .icon');
    console.log(icon_points);
    icon_points.forEach((element,index) => {
        console.log(element);
        element.addEventListener('click',(event)=>{
            new_question_btn[index].click()
        })
    });

}

let unique_id=0;
function create_question_element(q_text,q_points) {
    let txt=(q_text)?q_text:"";
    let pnts=(q_points)?q_points:0;
    return ({
        text:txt,
        points:pnts,
        anserws:[],
        img:"",
    });
}


pointsSelection();
createTrivia_controls();