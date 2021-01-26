let dropdownButton = document.getElementById("dropdownButton");
let dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("hidden");
});

window.onclick = function (event) {
    dropdownMenu.classList.add("hidden");
};
