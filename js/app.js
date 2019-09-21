'use strict';
function weatherInfo() {
    document.querySelector('#search-btn').onclick = () => {
        // запрос
        const searchValue = document.querySelector('#search-area').value;
        const request = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=32dda4a23cf5093afca2f2f086c16833`;

        if (searchValue.trim() != '') {
            // обработчик
            function showData(data) {
                const weatherCard = document.querySelector('.weather-card'),
                    titleCard = document.querySelector('.title-description'),
                    titleData = document.querySelector('.weather-card__title h2'),
                    tempData = document.querySelector('.weather-card__temp p'),
                    descData = document.querySelector('.weather-card__description p'),
                    dataImg = document.querySelector('.weather-card__img'),
                    dataWind = document.querySelector('.weather-card__wind p'),
                    dataHumidity = document.querySelector('.weather-card__humidity p');

                // перевод слов на русский
                switch (data.weather[0].description) {
                    case 'light rain':
                        data.weather[0].description = 'легкий дождь';
                        break;
                    case 'clear sky':
                        data.weather[0].description = 'чистое небо';
                        break;
                    case 'scattered clouds':
                        data.weather[0].description = 'рассеянные облака';
                        break;
                    case 'broken clouds':
                        data.weather[0].description = 'облачность';
                        break;
                    case 'haze':
                        data.weather[0].description = 'туман';
                        break;
                    default:
                        break;
                }

                weatherCard.style.display = 'block';
                titleCard.style.display = 'block';
                titleData.textContent = `${data.name}, ${data.sys.country}`;
                tempData.innerHTML = Math.round(data.main.temp - 273) + '&deg C';
                descData.textContent = data.weather[0].description;
                dataImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">`;
                dataWind.textContent = `Скорость ветра: ${data.wind.speed}м/c`;
                dataHumidity.textContent = `Влажность: ${data.main.humidity}%`;
            }

            // вывод
            fetch(request)
                .then(function (resp) {
                    return resp.json();
                })
                .then(function (data) {
                    showData(data);
                })
                .catch(function () {
                    alert('Город не найден!');
                });
        } else {
            alert('Введите город!');
        }
    };

}
weatherInfo();