const toggleModal = () => {
    let modal = document.querySelector(".modal");
    let body = document.querySelector("body");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
};

let grid = document.querySelector(".grid");

grid.addEventListener("click", (event) => {
    if (event.target.closest(".movie-card")) {
        let movieCard = event.target.closest(".movie-card");
        let title = movieCard.dataset.title;
        let modal = document.querySelector(".modal");

        let modalContent = modal.querySelector(".modal-content > div > p");
        // document.removeEventListener("click", arguments.callee);
        modalContent.textContent = title;
        toggleModal();
    }
});

const overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", toggleModal);

var closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener("click", toggleModal);
}

// let closeModal = document.querySelector(
//     ".modal .modal-container .footer .modal-close"
// );
// closeModal.addEventListener("click", toggleModal);

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
        isEscape = evt.keyCode === 27;
    }
    if (isEscape && document.body.classList.contains("modal-active")) {
        toggleModal();
    }
};
