var unInputText = document.getElementById("username");
var unBtn = document.getElementById("btn");

unInputText.addEventListener("change",() => {
    if(unInputText.value != ""){
        unBtn.className = "valid";
        unBtn.disabled = false;
    }else {
        unBtn.className = "invalid";
        unBtn.disabled = true;
    }
});