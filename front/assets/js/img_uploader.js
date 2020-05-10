
function img_uploader() {
    let img_uploader=document.querySelectorAll(".img_uploader")[0];
    
    if(!img_uploader) return;

    // let img_preview=img_uploader.querySelectorAll(".fileinput-preview")[0];
    let img_holder=img_uploader.querySelectorAll(".img_holder")[0];
    let btn_file=img_uploader.querySelectorAll(".btn-file")[0];

    btn_file.addEventListener('click',()=>{
        let input_file=img_uploader.querySelectorAll(".btn-file .fileinput-container")[0];
        input_file.click();
    })
    

    $(".fileinput-preview").bind("DOMNodeInserted",function(){  
        if(img_holder.classList.contains("hiding"))return
        let hiding=img_uploader.querySelectorAll(".hiding");
        let hideable=img_uploader.querySelectorAll(".hideable");
        hiding.forEach((el)=>{
            el.classList.remove("hiding");
            el.classList.add("hideable");
        });
        hideable.forEach((el)=>{
            el.classList.remove("hideable");
            el.classList.add("hiding");
        });
        let input_file=img_uploader.querySelectorAll(".btn-file .fileinput-container")[0];
        console.log(input_file.files[0]);
    });
    $(".btn_remove_img").bind("click",function(){
        let hiding=img_uploader.querySelectorAll(".hiding");
        let hideable=img_uploader.querySelectorAll(".hideable");
        hiding.forEach((el)=>{
            el.classList.remove("hiding");
            el.classList.add("hideable");
        });
        hideable.forEach((el)=>{
            el.classList.remove("hideable");
            el.classList.add("hiding");
        });
    });

}


img_uploader();