let form = document.querySelector("#searchform");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let api_params = {
        api_key: "ecb83265a11cb5ea5791bd8dd62a6f21",
        language: "en-US",
    };
    //INITIAL SEARCH
    let query = form.querySelector("input[type=text]").value;
    let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_params.api_key}&language=en-US&query=${query}&page=1&include_adult=false&region=US`
    );
    let records = await response.json();

    let moviesArr = records.results;
    let totalPages = Math.min(records.total_pages, 9);

    for (let page = 2; page <= totalPages; page++) {
        response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_params.api_key}&language=en-US&query=${query}&page=${page}&include_adult=false&region=US`
        );

        records = await response.json();

        moviesArr = moviesArr.concat(records.results);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    //Grab imdb_ids from the movie databse for each movie query result
    let promises = moviesArr.map(async (movie, index) => {
        let response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_params.api_key}&language=${api_params.language}`
        );
        record = await response.json();

        let imdbid = record.imdb_id || null;
        moviesArr[index].imdb_id = imdbid;
    });

    await Promise.all(promises);

    console.log("Hi");

    // Grab full details from open movie database
    promises = moviesArr.map(async (movie, index) => {
        let imdb_id = movie.imdb_id;
        console.log(imdb_id);
        let response = await fetch(
            `https://private.omdbapi.com/?i=${imdb_id}&apikey=9a14bb73`
        );
        let result = await response.json();
        moviesArr[index] = {
            ...moviesArr[index],
            ...result,
        };
    });

    await Promise.all(promises);
    console.log(moviesArr);

    let filteredResults = moviesArr.filter((movie, index) => {
        return movie.Title;
    });

    populateSearchResultCards(filteredResults);
});

const populateSearchResultCards = (filteredResults) => {
    let resultsGrid = `
    <h2 class="text-white text-center text-xl">Results</h2>

    <div id="results" class="grid grid-cols-2 gap-6 gap-y-4 px-24 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-flow-row sm:gap-6 lg:gap-6 xl:gap-6 md:gap-6 md:px-32 xl:px-32 2xl:px-56 auto-rows-fr p-6 sm:px-8">

    </div>
    `;

    let elem = document.querySelector("#divider");
    if (elem) {
        elem.parentNode.removeChild(elem);
    }

    let links = document.querySelector("#top-links");

    if (links) {
        var outerDiv = document.createElement("div");
        outerDiv.id = "results-outer";
        outerDiv.innerHTML = resultsGrid;
        outerDiv.className = "mt-5";
        links.parentNode.replaceChild(outerDiv, links);
    } else {
        var outerDiv = document.querySelector("#results-outer");
    }

    let cards_innerhtml = "";
    filteredResults.forEach((movie, index) => {
        let {
            title,
            overview,
            Genre = "",
            Rated = "",
            Ratings = "",
            BoxOffice = "",
            poster_path,
            release_date = "",
            imdbVotes = "",
            imdbID = "",
        } = movie;

        let imdb_rating = "";
        let rottentom_rating = "";
        let metacritic_rating = "";

        if (Ratings) {
            Ratings.forEach((rating) => {
                switch (rating.Source) {
                    case "Internet Movie Database":
                        imdb_rating = Number(rating.Value.split("/")[0]);
                        break;
                    case "Rotten Tomatoes":
                        rottentom_rating = parseInt(rating.Value.split("%")[0]);
                        break;
                    case "Metacritic":
                        metacritic_rating = parseInt(
                            rating.Value.split("/")[0]
                        );
                        break;
                }
            });
        }

        if (imdbVotes) {
            try {
                imdbVotes = parseInt(imdbVotes.replaceAll(",", ""));
                if (Number.isNaN(imdbVotes)) {
                    imdbVotes = null;
                }
            } catch (error) {
                imdbVotes = null;
            }
        }

        if (release_date) {
            var year = parseInt(release_date.split("-")[0]);
        }

        if (poster_path) {
            var imgsrc = `https://image.tmdb.org/t/p/w500${poster_path}`;
            var imgHTML = `<img class="w-full h-4/6"  src="${imgsrc}"></img>`;
        } else {
            var imgsrc = `data:image/png;base64,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`;
            var imgHTML = `
            <div class="w-full h-4/6 bg-cover bg-center bg-no-repeat" style="background-image: url('${imgsrc}')">
            </div>`;
        }

        overview = overview.replace(/"/g, `\'`);

        cards_innerhtml += `
            <a
                data-title="${title}"
                data-year="${year}"
                data-rated="${Rated}"
                data-imdb="${imdb_rating}"
                data-rottentom="${rottentom_rating}"
                data-metacritic="${metacritic_rating}"
                data-synopsis="${overview}"
                data-imdbid="${imdbID}"
                class="movie-card block bg-black shadow-lg cursor-pointer transform hover:scale-105 duration-300 ease-in-out overflow-hidden rounded-lg"
                title="${title}">
                ${imgHTML}

                <div class="h-12 px-2 p-0 flex flex-col justify-center items-center rounded-lg rounded-t-none bg-gray-900">
                    <p class="block text-sm sm:text-xl uppercase font-mono text-white truncate w-full text-center leading-none p-0">${title}</p>
                    <p class="block text-xs sm:text-base uppercase font-mono text-white leading-none">(${year})</p>
                </div>
            </a>
        `;
    });

    outerDiv.querySelector("#results").innerHTML = cards_innerhtml;

    addGridEventListener();
};
