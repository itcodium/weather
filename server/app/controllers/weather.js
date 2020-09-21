const axios = require('axios');

const API_KEY = "bf323b133af7ff6a6c87abae9f8ee9a7";
const API_LOCATION = 'https://ipapi.co/json';
const API_URL = "https://api.openweathermap.org/data/2.5/";

export default class WeatherController {
    static getData(url, req, res, next) {
        axios.get(url)
            .then(response => {
                if (next) {
                    req.city = response.data.city;
                    next();
                } else {
                    return res.status(200).json(response.data);
                }
            })
            .catch(error => {
                return res.status(500).json({ "error": "City not found." });
            });
    }
    static getLocation(req, res) {
        WeatherController.getData(API_LOCATION, req, res)
    }
    static findLocation(req, res, next) {
        WeatherController.getData(API_LOCATION, req, res, next);
    }
    static getWeatherUrl(city, service) {
        return API_URL + service + "?q=" + encodeURI(city) + "&appid=" + API_KEY;
    }
    static getCurrent(req, res) {
        const url = WeatherController.getWeatherUrl(req.city, 'weather');
        WeatherController.getData(url, req, res);
    }
    static getForecast(req, res) {
        const url = WeatherController.getWeatherUrl(req.city, 'forecast');
        WeatherController.getData(url, req, res);
    }
    static city(req, res, next, city) {
        req.city = city ? city : null;
        return next();
    }
}