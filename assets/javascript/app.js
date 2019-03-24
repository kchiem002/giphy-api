let userInput
let stillImage
let movingImage
let toggle = false

const submitInput = () => {
    event.preventDefault()
    userInput = document.querySelector('#search-input').value
    //log searchHistory as a button
    let searchHistory = document.createElement('button')
    searchHistory.textContent = `${userInput}`
    searchHistory.className = `history-button`
    document.querySelector('#input-history').append(searchHistory)
    getGiphy()
}

const getGiphy = () => {
    document.querySelector('#giphy-container').innerHTML = ''
    fetch (`https://api.giphy.com/v1/gifs/search?api_key=CUKJmcJMux05tWZr0IFYGFlN37Z3N3op&q=${userInput}&limit=25&offset=0&rating=G&lang=en`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            //loop to append all giphys from the search
            for (let i = 0; i < r.data.length; i++) {
            stillImage = r.data[i].images.fixed_height_still.url
            movingImage = r.data[i].images.fixed_height.url
            let giphy = document.createElement('span')
            giphy.innerHTML = `<img class="giphy" src="${stillImage}" data-still="${stillImage}" data-moving="${movingImage}">`
            document.querySelector('#giphy-container').append(giphy)
            }
        })
        .catch ( e => {
            })
}

document.addEventListener('click', event => {
    if (event.target.className === 'history-button') {
        userInput = event.srcElement.textContent
        getGiphy()
    }
    else if (event.target.className === 'giphy') {
        toggle = !toggle
        let { still, moving } = event.target.dataset
        if (toggle) {
            event.target.setAttribute('src', moving)
        }
        else {
            event.target.setAttribute('src', still)
        }
    }
})


