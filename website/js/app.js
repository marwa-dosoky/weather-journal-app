const apiKey = 'f33853f217c0c2bd36db3063d7a92cbf';
let apiURL;

//add click handler to the button
document.getElementById('generate').addEventListener("click", generateWeatherInfo);

async function generateWeatherInfo() {
    let zipCode = document.getElementById("zip").value;

    //check if the zip code is valid. zip code with hyphen/dash not applicable here
    if (!String(zipCode).match("^[0-9]+$")) {
        alert('Please enter valid zip code');
    } else {
        apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=metric&appid=${apiKey}`;

        //calling weather API
        const request = await callwetherapi();
    }
}

async function callwetherapi() {
    const request = await fetch(apiURL).then(async request => {
        const allData = await request.json();
        console.log(allData);
        return allData;
    }).then(allData => {
        return postWeather(allData, '/saveData');
    }).then(() => {
        getWeatherobj();
    }).catch(error => {
        console.error(error)
        alert('Problem in retrieving city weater Info, Please check if the zip code is invalid or inapplicable');
    });
    return request;
}

//send the data from the weather API to the server
async function postWeather(allData, saveDataUrl) {
    let temp = allData.main.temp
    let feelings = document.getElementById("feelings").value;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let response=await fetch(saveDataUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            temp: temp,
            feelings: feelings
        })
    });
return response;
}

//retrieve the weather content from the server
async function getWeatherobj() {
    const request = await fetch('/getData').then(async request => {
        const allData = await request.json();//obj returned form server

        document.getElementById('entry').innerHTML = 'Entry';
        document.getElementById('date').innerHTML = '<b>Date: </b>' + allData.date;
        document.getElementById('temp').innerHTML = '<b>Temperature: </b>' + allData.temp;
        document.getElementById('content').innerHTML = '<b>Feelings: </b>' + allData.feelings;

    });
}