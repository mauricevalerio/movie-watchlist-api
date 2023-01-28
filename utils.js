import { getUnsplashedUrl } from './apiConfig.js'

let isDarkMode = false

function clearDomChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

/* Getting random unsplashed photos */
function getRandomBgHeader() {
    return fetch(getUnsplashedUrl(), { 'Accept-Version': 'v1' })
        .then(response => response.json())
        .then(data => data)
}

function getBgHtml() {
    getRandomBgHeader()
        .then(data => {
            document.getElementById('header-container').style.background = `center/cover url(${data.urls.regular})`
        })
}

function handleDarkMode(darkElementsArray) {
    for (let dark of darkElementsArray) {
        document.querySelector(dark).classList.toggle('dark')
    }
    isDarkMode = !isDarkMode
}

function checkLocalStorageLength() {
    let localStorageData = JSON.parse(localStorage.getItem("watchlist"))
    if (!localStorageData.length) {
        localStorage.clear()
    }
}

function removeFromLocalStorage(id) {
    let watchListArray = JSON.parse(localStorage.getItem("watchlist"))

    const removeMovie = watchListArray.find(movie => movie.imdbID === id)
    watchListArray.splice(watchListArray.indexOf(removeMovie), 1)

    localStorage.setItem("watchlist", JSON.stringify(watchListArray))
    checkLocalStorageLength()
}

function checkWatchlist(id) {
    if (JSON.parse(localStorage.getItem("watchlist")) == null) {
        return `<button data-add-movie-id="${id}" class="add-watchlist-button"><span class="index-plus-icon">+</span> Add Watchlist</button>`
    } else {
        if (JSON.parse(localStorage.getItem("watchlist")).some(movie => movie.imdbID === id)) {
            return `<button data-remove-movie-id="${id}" class="remove-watchlist-button"><span class="index-minus-icon">-</span> Remove Watchlist</button>`
        } else {
            return `<button data-add-movie-id="${id}" class="add-watchlist-button"><span class="index-plus-icon">+</span> Add Watchlist</button>`
        }
    }

}

//Reused in both HTML page to render movies
function getMovieHtml(data) {
    return `
    <section class="movie-section">
        <div>
            <img src="${data.Poster}" alt="${data.Title} Poster" class="movie-image"/>
        </div>

        <div class="movie-details-outer">
            <div class="movie-title-rating">
                <h3 class="movie-title">${data.Title}</h3>
                <span class="movie-rating"><img src="images/star-icon.png" alt="Star Icon Rating" class="star-icon"/> ${data.imdbRating}</span>
            </div>

            <div class="movie-details-inner">
                <p class="movie-genre">${data.Genre}</p>
                <span class="movie-runtime">${data.Runtime}</span>
                <div class="watchlist-button-container">
                    ${checkWatchlist(data.imdbID)}
                </div>
            </div>
            
            <p class="movie-plot">${data.Plot}</p>
        </div>
    </section>
    `
}

export { clearDomChildren, getBgHtml, checkWatchlist, getMovieHtml, removeFromLocalStorage, handleDarkMode }

