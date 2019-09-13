console.log('Client side javascript is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1content = document.querySelector('#message-1')
const message2content = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1content.textContent = data.error
            }else{
                message1content.textContent = data.forecast
                message2content.textContent = data.location
            }
        })    
    })

})