
// 인풋값 확인

const inputCheck = document.querySelector("#but-sing-up");

function checkInput(ev) {
    ev.preventDefault();
    const inputCh1 = document.querySelector("#prodeuct-name");
    const inputCh2 = document.querySelector("#items");
    const inputCh3 = document.querySelector("#summary");
    const inputCh4 = document.querySelector("#detailed-description");
    const inputCh5 = document.querySelector("#inventory");
    const inputCh6 = document.querySelector("#price");
    
    console.log(inputCh1.value);
    console.log(inputCh2.value);
    console.log(inputCh3.value);
    console.log(inputCh4.value);
    console.log(inputCh5.value);
    console.log(inputCh6.value);
}

inputCheck.addEventListener("click", checkInput);