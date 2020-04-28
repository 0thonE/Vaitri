
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
    icon_points.forEach((element,index) => {
        element.addEventListener('click',(event)=>{
            inputs_points[index].click();
            update_points(index);
        })
    });

}

let questions_list=[];
let current_question;
var is_first_time_flag=false;
let current_question_card;

function createTrivia_controls() {
    let new_question_btn=document.querySelectorAll('.questions-side_bar .btn-new_question');
    let save_trivia_btn=document.querySelectorAll('.btn-save');
    
    new_question_btn.forEach((element) => {
        element.addEventListener('click', event=>{
            new_question();
        });
        
    });
    save_trivia_btn.forEach((element) => {
        element.addEventListener('click', event=>{
            save_trivia();
        });
        
    });
    
    let question_txt=document.querySelectorAll('.card_question_fields .question_text')[0];
    question_txt.addEventListener('change',(event)=>{
        update_question_text(question_txt.value);
    })

    let question_answs_txt=document.querySelectorAll('.card_question_fields .question_answers input[type="text"]');
    let question_answs_correct=document.querySelectorAll('.card_question_fields .question_answers input[type="checkbox"]');
    question_answs_txt.forEach((element,index) => {
        element.addEventListener('change', event=>{
            if(element.value===""){
                question_answs_correct[index].click();
                question_answs_correct[index].disabled=true;
            } else 
                question_answs_correct[index].disabled=false;
            
            update_answer_txt(index,element.value);

        });
        
    });

    question_answs_correct.forEach((element,index) => {
        element.addEventListener('click', event=>{
            update_answer_correct(index,element.checked);
        });
        
    });

    // image controls
    $(".fileinput-preview").bind("DOMNodeInserted",function(){  
        let img_preview=document.querySelectorAll(".img_uploader .fileinput-preview img")[0];
        let in_file=document.querySelectorAll(".img_uploader .fileinput-container")[0];
        update_img_src(img_preview.src,in_file.files[0]);
    });
    $(".btn_remove_img").bind("click",function(){
        default_img_src();
    });

}
let id=0;
function new_question(q_text,q_points,q_anserws,q_img) {
    let question=create_question_element();
    questions_list.push(question);
    // current_question=questions_list[questions_list.length-1];
    
    
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
                    <button type="button" class="btn btn-danger btn-link fix-broken-card" style="visibility: hidden;">
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
                <div class="card-footer">
                    <div class="stats">
                        <Strong><p class="valor_label">Valor</p></Strong>
                    </div>
                    <div class="stats">
                        <p class="question_points"></p>
                    </div>
                </div>
            </div>
        </div>`;
    
    let template = document.createElement('div');
    template.innerHTML=question_card;

    let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
    
    question_cards_list.appendChild(template.children[0]);

    let last_el_index=questions_list.length-1;
    let q_card=question_cards_list.children[last_el_index];
    
    let last_edit_button=question_cards_list.querySelectorAll('.btn_edit_question')[last_el_index];
    last_edit_button.addEventListener('click',(event)=>{
        edit_question(q_card);
    });
    let last_delete_button=question_cards_list.querySelectorAll('.btn_delete_question')[last_el_index];
    last_delete_button.addEventListener('click',(event)=>{
        delete_question(q_card);
    });
    
    last_edit_button.click();
}

function create_question_element(id,q_text,q_points,q_anserws,q_img,q_file,q_val) {
    let txt=(q_text)?q_text:"";
    let pnts=(q_points==1||q_points==2)?q_points:0;
    let img=(q_img)?q_img:"";
    let fl=(q_file)?q_file:{};
    let val=(q_val)?q_val:false;
    let answs=(q_anserws)?q_anserws:[];
    if(answs.length===0)for(let i=0;i<6;i++) answs.push({
        text:"",
        correct:false,
    });
    return ({
        text:txt,
        points:pnts,
        answers:answs,
        file:fl,
        img_src:img,
        valid:val,
        id:id,
    });
}

function edit_question(q_card) {
    let q_card_list=document.querySelectorAll('.questions-side_bar .question-cards-list')[0];
    let index=Array.prototype.indexOf.call(q_card_list.children,q_card);
    if(current_question===undefined){
        is_first_time_flag=true;
        current_question=questions_list[index];
    }
    let currentIndex = questions_list.indexOf(current_question);

    q_card_list.children[currentIndex].querySelector('.card-product').classList.remove('invalid_question')

    if(!current_question.valid&&!is_first_time_flag)
        q_card_list.children[currentIndex].querySelector('.card-product').classList.add('invalid_question')
    
        is_first_time_flag=false;
    current_question=questions_list[index];
    if(current_question_card)
        current_question_card.children[0].classList.remove('active');
    // let q_card_list=document.querySelectorAll('.questions-side_bar .question-cards-list')[0];
    // current_question_card=q_card_list.children[index];
    current_question_card=q_card;
    if(current_question_card && current_question_card.children.length>0)
        current_question_card.children[0].classList.add('active');
    load_question(current_question);
}

function delete_question(q_card) {
    let q_card_list=document.querySelectorAll('.questions-side_bar .question-cards-list')[0];
    let index=Array.prototype.indexOf.call(q_card_list.children,q_card);
    if(q_card_list.children.length<2) {
        alert('no puedes tener menos de 1 elemento')
        return;
    }
    if(index===questions_list.indexOf(current_question)){
        current_question=(index===0)?questions_list[1]:questions_list[index-1]
        let new_q_card=(index===0)?q_card_list.children[1]:q_card_list.children[index-1]
        edit_question(new_q_card);
    }
    q_card_list.removeChild(q_card);
    questions_list.splice(index,1);
}

function load_question(_question) {
    let question=(questions_list.length===0)?{
        text:"",
        points:0,
        answers:[],
        img_src:"",
        valid:false,
    }:_question;
    document.querySelectorAll('.card_question_fields .question_text')[0].value=question.text;
    document.querySelectorAll('.card_question_fields .points_col input')[question.points].click();
    let answers_checkboxs=document.querySelectorAll('.card_question_fields .question_answers input[type="checkbox"]');
    let answers_texts=document.querySelectorAll('.card_question_fields .question_answers input[type="text"]');
    
    question.answers.forEach((element,index) => {
        answers_texts[index].value=element.text;
        answers_checkboxs[index].checked=element.correct;
    });

    image_load(question);
}

function image_load(question) {
    let img_uploader=document.querySelectorAll('.card_question_fields .img_uploader')[0];
    let img_holder=img_uploader.querySelectorAll('.img_holder')[0];
    let img_preview=img_uploader.querySelectorAll('.fileinput-preview')[0];
    let input_file=img_uploader.querySelectorAll(".btn-file .fileinput-container")[0];
    
    let remove_btn=img_uploader.querySelectorAll(".btn_remove_img")[0];
    // does it has an image?
    if(question.img_src===""||question.img_src.includes("./assets/img/image_placeholder.jpg") ){
        if(!img_holder.classList.contains("hiding")){
            input_file.value="";
            return;
        }
        // remove_btn.click();   
        document.querySelectorAll(".card_question_fields .img_uploader .btn_remove_img")[0].click()
        return;
    }
    // yes there is an image
    // if(!img_holder.classList.contains("hiding")){
        input_file.files[0]=question.file;
        img_preview.innerHTML=`<img src="${question.img_src}">`;
        return;
    // }

}

function update_points(points) {
    current_question.points=points;
    let index=questions_list.indexOf(current_question);
    let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
    question_cards_list.querySelectorAll('.question_points')[index].innerText=`${points} ${(points===1)?"punto":"puntos"}`;
}
function update_question_text(text) {
    current_question.text=text;
    let index=questions_list.indexOf(current_question);
    let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
    question_cards_list.querySelectorAll('.question_text')[index].innerText=text;
    current_question.valid=question_validity(current_question);
}
function update_answer_txt(index,text) {
    current_question.answers[index].text=text;
    current_question.valid=question_validity(current_question);
}
function update_answer_correct(index,correct) {
    current_question.answers[index].correct=correct;
    current_question.valid=question_validity(current_question);
}
function update_img_src(src,file) {
    current_question.img_src=src;
    current_question.file=file;
    console.log(current_question);
    let index=questions_list.indexOf(current_question);
    let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
    question_cards_list.querySelectorAll('.question_img')[index].src=src;
}
function default_img_src() {
    let src="../../assets/img/image_placeholder.jpg";
    current_question.img_src=src;
    let index=questions_list.indexOf(current_question);
    let question_cards_list=document.querySelectorAll('.question-cards-list')[0];
    question_cards_list.querySelectorAll('.question_img')[index].src=src;
}

function question_validity(question) {
    let valid=true;
    if(question.text==="")valid=false;
    let answs_filled=0;
    let answs_checked=0;
    question.answers.forEach(element => {
        if(element.text.length>0)answs_filled++;
        if(element.correct)answs_checked++;
    });
    if(answs_checked<1||answs_filled<2) valid=false;
    return valid
}

function save_trivia(){
    let validTrivia=true
    let validTriviaData=true;
    questions_list.forEach(element => {
        if(!element.valid)validTrivia=false;
    });
    if(!validTrivia){
        alert(`
    Por favor llene todas la preguntas.
    Cada una minimo con una pregunta y 2 respuestas.
    Seleccione al menos una como correcta`);
    return;
}
    
    let fecha_inputs=document.querySelectorAll('.card-product .fecha_input');
    fecha_inputs.forEach(element => {
        if(element.value.length<2) validTriviaData=false
    });
    let trivia_name=document.querySelectorAll('.card-product .trivia_name')[0];
    if(trivia_name.value==="") validTriviaData=false;
    
    if(!validTriviaData){
        alert(`
    Por favor llene los datos de la trivia.
    Llene los datos de la fecha en que se agenda.
    Asegurese de que la trivia tenga nombre`);
    return;
}

    let triviaObj={
        idTrivia:Date.now(),
        name:trivia_name,
        date:fecha_inputs[0].value+"/"+
                    fecha_inputs[1].value+"/"+
                    fecha_inputs[2].value,
        questions:questions_list,
    };
    let sess_triv= JSON.parse(sessionStorage.getItem("trivias") || "[]");
    sess_triv.push(triviaObj);
    sessionStorage.setItem("trivias", JSON.stringify(sess_triv));
    window.location.replace("./dashboard.html")

}


function create_new_trivia(){
    // new_question("hola",1,[{
    //     text:"woooot",
    //     correct:true,
    // }]);
    new_question();
}


pointsSelection();
createTrivia_controls();
create_new_trivia();