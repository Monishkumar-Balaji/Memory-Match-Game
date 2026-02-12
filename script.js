function loadBoxes(event){
    event.preventDefault(); // stop page refresh

    let input_selected = document.querySelector('input[name="difficulty"]:checked');
    let num = parseInt(input_selected.value) * 2;
    let outer_box = document.querySelector(".outer-box");
    if(!outer_box){
        console.log("Outer-box is null");
        return;
    }
    outer_box.style.visibility="visible";
    console.log(num);
    outer_box.innerHTML = "";
    let fragment = document.createDocumentFragment();
    for(let i=0; i<num; i++){
        let temp_box = document.createElement("div");
        temp_box.className="box";
        fragment.appendChild(temp_box);
    }
    // document.querySelector('input[name="difficulty"]').style.visibility = "hidden";

    outer_box.appendChild(fragment);
}