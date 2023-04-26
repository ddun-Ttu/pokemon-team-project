const but = document.querySelector("#categories-but");
const categoriesName =  document.querySelector("#categories-name");
const explanation = document.querySelector("#explanation");

but.addEventListener("click", function(e) {
    e.preventDefault();
    console.log(categoriesName.value)
    console.log(explanation.value)
})