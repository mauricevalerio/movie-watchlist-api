import { clearDomChildren, getBgHtml, getMovieHtml, removeFromLocalStorage, handleDarkMode } from "./utils.js"

getBgHtml()

function renderWatchlist() {
    clearDomChildren(document.getElementById('movie-list-results'))
    if (JSON.parse(localStorage.getItem("watchlist"))) { //pulls data from local storage
        JSON.parse(localStorage.getItem("watchlist")).forEach(watchlist => {

            document.getElementById('movie-list-results').innerHTML += getMovieHtml(watchlist)
            //calls same function that renders the search page
        })
    } else {
        document.getElementById('movie-list-results').innerHTML = `
    <img src="images/index-icon-movie.png" alt="Default icon when there is no watchlist">
    <p>Your watchlist is looking a little empty</p>
    <a href="index.html" class="index-link"><span class="watchlist-plus-icon">+</span> Let's add some movies!</a>
    `
    }
}

renderWatchlist()

document.addEventListener('click', e => {
    if (e.target.dataset.removeMovieId) {
        removeFromLocalStorage(e.target.dataset.removeMovieId)
        renderWatchlist()
    }
})

document.querySelector('.toggle-mode-outer').addEventListener('click', e => handleDarkMode(['.toggle-mode-outer', '.toggle-mode-inner', 'body', '.movie-list-results']))