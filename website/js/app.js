const apiKey = 'f33853f217c0c2bd36db3063d7a92cbf';
let apiURL;


document.getElementById('generate').addEventListener("click", generateWeatherInfo);

async function generateWeatherInfo() {
    let zipCode = document.getElementById("zip").value;
    apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=metric&appid=${apiKey}`;

    const request = await callwetherapi();

    console.log('calling API');
}

async function callwetherapi() {
    const request = await fetch(apiURL).then(request => {
        const allData = request.json();
        console.log(allData);
        return allData;
    }).then(allData => {
        postWeather(allData, '/saveData');
    })
        .catch(error => console.error(error));
    return request;
}

async function postWeather(allData, saveDataUrl) {
    let temp = allData.main.temp
    let feelings = document.getElementById("feelings").value;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    await fetch(saveDataUrl, {
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

}