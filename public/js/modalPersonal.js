const toggleModal = () => {
    let modal = document.querySelector(".modal");
    let body = document.querySelector("body");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
};

const overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", toggleModal);

var closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener("click", toggleModal);
}

let grid = document.querySelector(".grid");

grid.addEventListener("click", (event) => {
    if (event.target.closest(".movie-card")) {
        let movieCard = event.target.closest(".movie-card");
        let id = movieCard.dataset.movieid;
        let title = movieCard.dataset.title;
        let year = movieCard.dataset.year;
        let synopsis = movieCard.dataset.synopsis;
        let rated = movieCard.dataset.rated;
        let rottentom = movieCard.dataset.rottentom;
        let imdb = movieCard.dataset.imdb;
        let metacritic = movieCard.dataset.metacritic;
        let modal = document.querySelector(".modal");

        let overlay = document.querySelector(".modal-overlay");
        overlay.removeEventListener("click", toggleModal);

        let closemodal = document.querySelectorAll(".modal-close");
        for (var i = 0; i < closemodal.length; i++) {
            closemodal[i].removeEventListener("click", toggleModal);
        }

        let modalTemplate = `
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                
                <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                    <span class="text-sm">(Esc)</span>
                </div>
                
                <!-- Add margin if you want to see some of the overlay behind the modal-->
                <div class="modal-content py-4 text-left px-6 font-mono">
                    <!--Title-->
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold ">${title} (${year})</p>
                        <div class="modal-close cursor-pointer z-50">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>

                <!--Body-->
                <div class="mb-5">Rated ${rated}</div>
                <div class="mb-5">${synopsis}</div>
                <div>Rotten Tomatoes: ${rottentom}</div>
                <div>MetaCritic: ${metacritic}</div>
                <div>IMDB: ${imdb}</div>

                <!--Footer-->
                <div class="footer flex justify-end pt-2">
                    <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close</button>
                </div> 
            </div>
            `;

        modal.innerHTML = modalTemplate;

        overlay = document.querySelector(".modal-overlay");
        overlay.addEventListener("click", toggleModal);

        closemodal = document.querySelectorAll(".modal-close");
        for (var i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener("click", toggleModal);
        }
        toggleModal();
    }
});

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
