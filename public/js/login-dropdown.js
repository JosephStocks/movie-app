let dropdownButton = document.getElementById("dropdownButton");
let dropdownMenu = document.getElementById("dropdownMenu");

// open/activate the dropdown menu
if (dropdownButton) {
    dropdownButton.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
        dropdownButton.classList.toggle("hover:border-indigo-400");
        dropdownButton.classList.toggle("py-2");
        dropdownButton.classList.toggle("px-4");
        dropdownButton.classList.toggle("lg:p-4");
        dropdownButton.classList.toggle("py-3");
        dropdownButton.classList.toggle("px-0");
        dropdownButton.querySelector("svg").classList.toggle("rotate-90");
    });

    //Close the dropdown if user clicks anywhere else on the window
    window.onclick = function (event) {
        dropdownMenu.classList.add("hidden");
        dropdownButton.querySelector("svg").classList.add("rotate-90");
        dropdownButton.classList.add("hover:border-indigo-400");
        dropdownButton.classList.remove("py-2");
        dropdownButton.classList.remove("px-4");
        dropdownButton.classList.add("lg:p-4");
        dropdownButton.classList.add("py-3");
        dropdownButton.classList.add("px-0");
    };
}
