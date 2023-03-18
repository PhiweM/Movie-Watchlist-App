const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const movieComponents = document.getElementById('main');
const watchListArr = [];


// adding click response to search btn
searchBtn.addEventListener('click',handleSearch);
search.addEventListener('keyup',e => {
    if(e.keyCode === 13){
        handleSearch();
    }
});

//function that fetches search on click
 function handleSearch() {

        movieComponents.innerHTML = "";
        const movieTitles = [];
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=cf546366&s=${search.value}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response !== 'False') {
                data.Search.forEach(element => {
                    movieTitles.push(element.Title)
                });
            }
            else {
                movieComponents.innerHTML = `<p class="start-exploring">Unable to find what you're looking for. <br/>Please try another search.</p>`;
                console.log("error");
            } 
             

         //loop through Titles array and fetch individual movie titles
         for(var i = 0; i < movieTitles.length; i++) {
            fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=cf546366&t=${movieTitles[i]}`)
            .then(res => res.json())
            .then(data => {
                const movieData = {
                    Image: data.Poster,
                    Title: data.Title,
                    Rating: data.imdbRating,
                    Runtime: data.Runtime,
                    Genre: data.Genre,
                    Plot: data.Plot
                }

            watchListArr.push(movieData);
            renderSearchResult(movieData);          
    
            }) //end 2nd then data function   
        }//end for loop 
        }) //end 1st then data function
 }



 //function that renders the searched movie results.
 function renderSearchResult(data){
    //Add items to div element 
    movieComponents.innerHTML +=    `
    <div class="card">
        <p id="count"></p>
        <img src=${data.Image} alt="movie image" class="movie-img">

        <div class="card-contents">
            <div class="card-title-wrapper">
                <h3 class="card-title">${data.Title}</h3>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <p class="score">${data.Rating}</p>
                </div>
            </div>

            <div class="movie-stats">
                <p class="runtime">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <div class="add-to-watchList" onClick="addToWatchList(event)">
                    <i class="fa-solid fa-circle-plus" id="add-watchList"></i>
                    <p >WatchList</p>
                </div>
            </div>

            <p class="plot">${data.Plot}</p>
        </div>
    </div>
    `;
}

 //function to add movies to watchList onClick
const localMovies = []
   
function addToWatchList(event) {
    const card = event.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;

    // Get existing movies from local storage or create an empty array
    let localMovies = JSON.parse(localStorage.getItem('movies')) || [];
    
    // Find the movie to add from the watchListArr array
    const movieToAdd = watchListArr.find(movie => movie.Title === title);

    // Add the movie to the localMovies array if it exists
    if (movieToAdd) {
        localMovies.push(movieToAdd)
    }
   
    // Store the updated localMovies array in local storage
    localStorage.setItem('movies', JSON.stringify(localMovies))

    //change add icon on movie card
    const icon = card.querySelector('#add-watchList');
    icon.classList.remove('fa-circle-plus');
    icon.classList.add('fa-circle-check');
}





