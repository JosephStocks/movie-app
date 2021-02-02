let dropdownButton2 = document.getElementById("dropdownButton2");
let dropdownMenu2 = document.getElementById("dropdownMenu2");

// open/activate the dropdown menu
dropdownButton2.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu2.classList.toggle("hidden");
    dropdownButton2.classList.toggle("hover:border-indigo-400");
    dropdownButton2.classList.toggle("py-2");
    dropdownButton2.classList.toggle("px-4");
    dropdownButton2.classList.toggle("lg:p-4");
    dropdownButton2.classList.toggle("py-3");
    dropdownButton2.classList.toggle("px-0");
    dropdownButton2.querySelector("svg").classList.toggle("rotate-90");
});

//Close the dropdown if user clicks anywhere else on the window
window.onclick = function (event) {
    dropdownMenu2.classList.add("hidden");
    dropdownButton2.querySelector("svg").classList.add("rotate-90");
    dropdownButton2.classList.add("hover:border-indigo-400");
    dropdownButton2.classList.remove("py-2");
    dropdownButton2.classList.remove("px-4");
    dropdownButton2.classList.add("lg:p-4");
    dropdownButton2.classList.add("py-3");
    dropdownButton2.classList.add("px-0");
};