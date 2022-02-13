const nav = document.querySelector(".link-box")
const ham = document.querySelector(".mob-icon")

ham.addEventListener("click", function(){
    nav.classList.toggle("nav_active")
})