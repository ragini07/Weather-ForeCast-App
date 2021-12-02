const searchBtn = document.querySelector("#SearchBtn");
const locationInput = document.querySelector("#input");
const weatherOutput = document.querySelector("#output")




searchBtn.addEventListener('click',(event) =>{
    event.preventDefault;
    fetch('http://localhost:3000/weather?address='+locationInput.value)
    .then(response => response.json())
    .then((data) => {
        if(data.errorMessage){
            console.log(data.errorMessage)
            weatherOutput.innerHTML = `<p>${data.errorMessage}</p>`
        }else{
            console.log(data.location)
            console.log(data.forecastDetails)
            weatherOutput.innerHTML = `<p>${data.location}</p> <p>${data.forecastDetails}</p>`

        }
    })

})
