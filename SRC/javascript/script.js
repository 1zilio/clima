document.querySelector('#search').addEventListener('submit', async (Event)=>{
    Event.preventDefault();

    const nome_da_cidade = document.querySelector('#nome_da_cidade').value;

    if (!nome_da_cidade){
        document.querySelector("#clima").classList.remove('show');
        showalert('Digite o nome da cidade...')
        return;
    }

    const apiKey = 'f10d4b19e8f434afb522dc5b728ab06a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nome_da_cidade)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showinfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,

        });
    } else {
        document.querySelector("#clima").classList.remove('show');
        showalert(`Não foi possivel localizar a cidade
            <img src="SRC/images/nao-encontrado.png"/>
            `)
    }

});

function showinfo(Json){
    showalert('');

    document.querySelector("#clima").classList.add('show');

    document.querySelector('#title').innerHTML = `${Json.city}, ${Json.country}`;

    document.querySelector('#temp_value').innerHTML = `${Json.temp.toFixed(0)}°C`;
    document.querySelector('#temp_description').innerHTML = `${Json.description}`;
    document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${Json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${Json.tempMax.toFixed(0)}°C`;
    document.querySelector('#temp_min').innerHTML = `${Json.tempMin.toFixed(0)}°C`;

    document.querySelector('#humidity').innerHTML = `${Json.humidity}%`;

    document.querySelector('#wind').innerHTML = `${Json.windSpeed.toFixed('0')}km/h`;
}
function showalert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}