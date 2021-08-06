const apiKey = 'f33853f217c0c2bd36db3063d7a92cbf';
let apiURL;

document.getElementById('generate').addEventListener("click", generateWeatherInfo);

async function generateWeatherInfo() {
    let zipCode = document.getElementById("zip").value;
    apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=metric&appid=${apiKey}`;

    //calling API
    const request = await callwetherapi();
}

async function callwetherapi() {
    const request = await fetch(apiURL).then(request => {
        const allData = request.json();
        return allData;
    }).then(allData => {
        postWeather(allData, '/saveData');
    }).then(()=>{
        getWeatherobj();
    }).catch(error => console.error(error));
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

async function getWeatherobj(){
    const request = await fetch('/getData').then( async request => {
        const allData = await request.json();//obj returned form server
        console.log(allData);
        entry
        document.getElementById('entry').innerHTML='Entry';
        document.getElementById('date').innerHTML=allData.date;
        document.getElementById('temp').innerHTML=allData.temp;
        document.getElementById('content').innerHTML=allData.feelings;
        
    });
}