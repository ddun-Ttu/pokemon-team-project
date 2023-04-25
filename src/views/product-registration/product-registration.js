
const RegisterProduct = document.querySelector("#but-sing-up");
const photoUpload = document.getElementById('photo-upload');
const preview = document.getElementById('preview');

// 사진 등록
photoUpload.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', function() {
      preview.src = reader.result;
    });
  
    reader.readAsDataURL(file);

    console.log(file);
  });
햐


// 인풋값 확인

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

RegisterProduct.addEventListener("click", checkInput);