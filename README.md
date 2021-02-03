## The Movie Matrix 


## AWS <>


This is app allows the user to search for different movies and return a list of movies based of their input. There is also a list of prepopulated Top 100 movies based off genre that the user can scroll through. Each movie card will contain data on the front and then once clicked, data on the back. Once the user has registered an account and they are logged in they can then search or used the prepopulated lists to save the movie to a "Want to Watch List", "Seen List" or "Favorites List".

<img src="./public/images/frontpage1.png" width="700" height="500">


<img src="./public/images/frontpage2.png" width="700" height="500">


**How To Use App**

- Account Login Name: test123@google.com
- Password for Account: 1234

To use the app simply click on the link provided above. User can choose to register and login or can use the login and password that are provided directly above. Once logged in the user can search for certain movies or use the pre-populated lists. To see the details of the movie card just simply click anywhere on the card of the movie and a modal dialog box will appear with the specific information regarding that movie. If the user decides they want to add this to any of their lists, they can hit either "Add to Watch List", "Add to Seen List", or "Add to Favorites". Once the user has added to the appropriate group the user can then navigate to the corresponding page which is located within the "Profile" dropdown menu. Here they can see each individual page that will correspond to any movies that have been saved. When the user is finished, they can simply logout. 

**Tech Stack**

- Javascript, HTML, Tailwind CSS, SQL, Sequelize, Passport
- API : TMDb API, OMDb API

**MVP**

Our base goal was to give the user the ability the register a username and password, login and choose a movie from the pre-populated lists so that they can add a chosen movie to a seen, favorites or watched list. 

<img src="./public/images/image1.png" width="700" height="500">

<img src="./public/images/cards1.png" width="700" height="500">

<img src="./public/images/table.png" width="700" height="500">

**Stretch Goals**

Implement a search bar that allows user to search the API directly and bring back results.

**Code Snippets**

Grab full details from open movie database:
```
    promises = moviesArr.map(async (movie, index) => {
        let imdb_id = movie.imdb_id;
        console.log(imdb_id);
        let response = await fetch(
            `http://private.omdbapi.com/?i=${imdb_id}&apikey=9a14bb73`
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
```

Responsive navbar dropdown menu checks if user is logged in:
```
<div class="lg:hidden xs:items-center w-auto" id="menu">
        <nav>
            <ul class=“lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0 “>
                    <li class=“group”>
                        <button id=“dropdownButton2" class=“dropdown bg-transparent lg:p-4 py-3 px-0 text-white font-semibold space-x-0 inline-flex items-center border-transparent font-mono border-b-2 hover:border-indigo-400 focus:border-transparent”>
                            <span class=“mr-1">Menu</span>
                            <svg class=“fill-current h-4 w-4 transform rotate-90 transition-all duration-200” xmlns=“http://www.w3.org/2000/svg” viewBox=“0 0 20 20”><path d=“M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z”/> </svg>
                        </button>
                        <ul id=“dropdownMenu2” class=“hidden z-10 absolute font-mono text-white pt-1">
                                <li><a class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/”>Home</a></li>
                                <li><a class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/team”>The Team</a></li>
                            <% if (isAuthenticated) { %>
                                <li><a class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/favorites”>Favorites</a></li>
                                <li><a class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/watchlist”>Watch List</a></li>
                                <li><a class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/seenlist”>Seen</a></li>
                                <li><a class=“rounded-b bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/logout”>Logout</a></li>
                            <% } else { %>
                                <li><a id=“loginButton” class=“rounded-t bg-black hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap” href=“/login”>Log In</a></li>
                                <li><a id=“loginButton” class=“rounded-t bg-black hover:bg-gray-400 py-2 px-1 block whitespace-no-wrap” href=“/registration”>Registration</a></li>
                            <% } %>
                        </ul>
                    </li>
            </ul>
        </nav>
  </div>

```

On button click, save cards to watchlist:
```
router.post("/watchlist", async (req, res) => {
    if (!req?.session?.passport?.user) {
        res.redirect("/login");
    }
    let movie = await db.movies.findOne({
        where: {
            id: req.body.id,
        },
    });

    let records = await db.watchlists.findAll({
        where: {
            userid: req.session.passport.user,
            movieid: req.body.id,
        },
    });

    if (movie && records.length === 0) {
        console.log(movie);
        await db.watchlists.create({
            userid: req.session.passport.user,
            movieid: movie.id,
        });
    }
});

```


**Screen Shots and GIFS**

Search Capabilities
![movie-matrix-search2](https://user-images.githubusercontent.com/26754072/106790757-9a11b780-6619-11eb-85cb-5bdaa59e0e17.gif)  
  
Saving Cards to Personal Lists
![movie-matrix-saving](https://user-images.githubusercontent.com/26754072/106791021-0096d580-661a-11eb-8f54-07f7f66a9bee.gif)



**Developer Team**

- Joe Stocks: Search API Calls, API Calls for Preloaded Data, Dynamically Populating Cards and Modals, Database Design
- Jacob Deel: UX, Design, Responsiveness
- Ian Haddock: Login, Registration, and Saving Cards to list. 