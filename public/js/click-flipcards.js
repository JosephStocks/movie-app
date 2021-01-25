document.querySelector("#card-holder").addEventListener("click", (e) => {
    let closestFlipCard = e.target.closest(".flip-card");
    if (closestFlipCard) {
        closestFlipCard
            .querySelector(".flip-card-inner")
            .classList.toggle("rotate3d-180");
    }
});

// document.querySelector("#card-holder").addEventListener("hover", (e) => {
//     let closestFlipCard = e.target.closest(".flip-card");
//     if (closestFlipCard) {
//         // closestFlipCard
//         //     .querySelector(".flip-card-inner .flip-card-inner.rotate3d-180")
//         //     .classList.toggle("rotate3d-neg15");

//         // closestFlipCard
//         //     .querySelector(".flip-card-inner :NOT(.rotate3d-180)")
//         //     .classList.toggle("rotate3d-15");
//         $(closestFlipCard).has(".rotate3d-180").toggleClass("rotate3d-neg20");
//         $(closestFlipCard)
//             .not(":has(.rotate3d-180)")
//             .toggleClass("rotate3d-20");
//     }
// });
