document.querySelector("#card-holder").addEventListener("click", (e) => {
    let closestFlipCard = e.target.closest(".flip-card");
    if (closestFlipCard) {
        closestFlipCard
            .querySelector(".flip-card-inner")
            .classList.toggle("rotate3d-180");
    }
});
