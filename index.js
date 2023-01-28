import { getOmdbUrl, getOmdbMovieDetailsUrl } from './apiConfig.js'
import { clearDomChildren, getBgHtml, checkWatchlist, getMovieHtml, removeFromLocalStorage, handleDarkMode } from './utils.js'

let hasEventListener = false
getBgHtml()

function addToLocalStorage(movie) {
    let watchListArray = JSON.parse(localStorage.getItem("watchlist"))
    if (watchListArray == null) watchListArray = []
    watchListArray.push(movie)
    localStorage.setItem("watchlist", JSON.stringify(watchListArray))
}

function toggleAddWatchlistBtn(id) {
    const template = document.createElement('template')
    template.innerHTML = checkWatchlist(id)
    document.querySelector(`[data-add-movie-id="${id}"]`).parentNode.appendChild(template.content)
    document.querySelector(`[data-add-movie-id="${id}"]`).remove()
}

function toggleRemoveWatchlistBtn(id) {
    const template = document.createElement('template')
    template.innerHTML = checkWatchlist(id)
    document.querySelector(`[data-remove-movie-id="${id}"]`).parentNode.appendChild(template.content)
    document.querySelector(`[data-remove-movie-id="${id}"]`).remove()
}

function createButtonListener() { //event listeners for adding and removing watchlist
    if (!hasEventListener) { //checks if the event listener has already been added
        document.addEventListener('click', e => {
            if (e.target.dataset.addMovieId) {
                fetch(getOmdbMovieDetailsUrl(e.target.dataset.addMovieId))
                    .then(response => response.json())
                    .then(data => {
                        addToLocalStorage(data)
                        toggleAddWatchlistBtn(e.target.dataset.addMovieId)
                    })
            } else if (e.target.dataset.removeMovieId) {
                removeFromLocalStorage(e.target.dataset.removeMovieId)
                toggleRemoveWatchlistBtn(e.target.dataset.removeMovieId)
            }
        })
        hasEventListener = !hasEventListener
    }
}

function getMovieDetails(movieDetails) {
    movieDetails.forEach(movie => {
        fetch(getOmdbMovieDetailsUrl(movie.imdbID))
            .then(response => response.json())
            .then(data => {
                document.getElementById('movie-list-results').innerHTML += getMovieHtml(data)
            })
    })
}

function getMovieList(e) {
    e.preventDefault()
    clearDomChildren(document.getElementById('movie-list-results'))

    fetch(getOmdbUrl(document.getElementById('search-form')))
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'False') {
                document.getElementById('movie-list-results').appendChild(document.createElement('p')).textContent =
                    `Unable to find what you're looking for. Please try another search. (${data.Error})`
            } else {
                getMovieDetails(data.Search)
                document.getElementById('search-form').reset()
                createButtonListener()
            }
        })
}

document.getElementById('search-form').addEventListener('submit', getMovieList)

document.querySelector('.toggle-mode-outer').addEventListener('click', e => handleDarkMode(['.toggle-mode-outer', '.toggle-mode-inner', 'body', '.movie-list-results',
    '.search-container', '.search-movie-input', '.search-movie-button']))