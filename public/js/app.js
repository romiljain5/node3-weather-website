console.log('client side')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const messageone = document.querySelector('#message-1')
    const messagetwo = document.querySelector('#message-2')

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    console.log(location)

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageone.textContent = data.error
        } else {
            console.log(data)
            messageone.textContent = data.Location
            messagetwo.textContent = data.Forecast

        }
    })
    })
})