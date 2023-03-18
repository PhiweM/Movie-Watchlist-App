const watchListComponents = document.getElementById('myWatchList')
const removeBtn = document.getElementById('remove-btn')

const savedMovies = JSON.parse(localStorage.getItem('movies'))

function renderWatchList() {
    // Generate HTML for each movie in the watch list
    
    let moviesHtml = "";
    if(savedMovies.length > 0) {
        moviesHtml  = savedMovies.map(movie => {
            return  `
            <div class="card">
                <p id="count"></p>
                <img src=${movie.Image} alt="movie image" class="movie-img">
        
                <div class="card-contents">
                    <div class="card-title-wrapper">
                        <h3 class="card-title">${movie.Title}</h3>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <p class="score">${movie.Rating}</p>
                        </div>
                    </div>
        
                    <div class="movie-stats">
                        <p class="runtime">${movie.Runtime}</p>
                        <p class="genre">${movie.Genre}</p>
                        <div class="add-to-watchList" onClick="removeFromWatchList(event)" id="remove-btn">
                            <i class="fa-solid fa-circle-minus" id="add-watchList"></i>
                            <p >WatchList</p>
                        </div>
                    </div>
        
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div>
            `
        }).join('')
    
    } else {
        moviesHtml = `
        <div class="add-movies-watchlist">
            <p >Your watchlist is looking a little empty...</p>
            <div class="add-movies">
                <a href="index.html" class="add-movies">
                    <i class="fa-solid fa-circle-plus"></i> 
                    <p class="add-movies">Let's adds some movies!</p>
                </a>
            </div>
        </div>
        `
    }
    // Insert the generated HTML into the watchListComponents element
      watchListComponents.innerHTML = moviesHtml
}

function removeFromWatchList(event) {
    const card = event.target.closest('.card');
    const title = card.querySelector('.card-title').textContent;

    // Find the index of the movie to remove in the savedMovies array
    const movieIndex = savedMovies.findIndex(movie => movie.Title === title);

    if (movieIndex !== -1) {
        // Remove the movie from the savedMovies array
        savedMovies.splice(movieIndex, 1);

        // Update the local storage with the updated savedMovies array
        localStorage.setItem('movies', JSON.stringify(savedMovies));

        // Render the updated watch list
        renderWatchList();
    }
}

//load watchList when window loads
document.addEventListener('DOMContentLoaded', renderWatchList)


