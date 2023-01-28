function getOmdbUrl(rawSearchFormData) {
    const searchFormData = new FormData(rawSearchFormData)

    let baseUrl = new URL('https://www.omdbapi.com/')
    baseUrl.searchParams.append('apiKey', '1a9d8ea6')
    baseUrl.searchParams.append('s', searchFormData.get('s'))

    return baseUrl.href
}

function getOmdbMovieDetailsUrl(imdbId) {
    let baseUrl = new URL('https://www.omdbapi.com/')
    baseUrl.searchParams.append('apiKey', '1a9d8ea6')
    baseUrl.searchParams.append('i', imdbId)

    return baseUrl.href
}

function getUnsplashedUrl() {
    let baseUrl = new URL('https://api.unsplash.com/photos/random')
    baseUrl.searchParams.append('client_id', '1rIQCHurOPJ4pAxi7nH--UxPJdbkQJ5ZDyGK5KItEFU')
    baseUrl.searchParams.append('collections', '68387245')

    return baseUrl.href
}

export { getOmdbUrl, getOmdbMovieDetailsUrl, getUnsplashedUrl }