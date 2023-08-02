const api = {
    key: `06cdba8fbf4f166e36929fce494161c8`,
    url: `https://api.openweathermap.org/data/2.5/weather`
};

const card = $("#card");

const city = $("#city");
const date = $("#date");
const tempImg = $("#temp-img");
const temp = $("#temp");
const weather = $("#weather");
const range = $("#range");

function updateImages(data) {
    const temp = toCelsius(data.main.temp);
    let src = "img/temp-mid.png";
    if (temp > 26) {
        src = "img/temp-high.png";
    } else if (temp < 20) {
        src = "img/temp-low.png";
    }
    tempImg.attr("src", src);
}

async function search(query){
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        
        console.log(data);
        date.html((new Date()).toLocaleDateString());
        updateImages(data);
        temp.html(`${toCelsius(data.main.temp)}c`);
        weather.html(data.weather[0].description);
        range.html(`${toCelsius(data.main.temp_min)}c - ${toCelsius(data.main.temp_max)}c`);
    } catch (error) {
        console.log(error);
        alert('Hubo un error');
    }
}
function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
function onSubmit(event) {
    event.preventDefault();
    search(searchbox.val());
}

const searchform = $("#search-form");
const searchbox = $("#searchbox");
searchform.on("submit", onSubmit);