import React from 'react';
import Select from 'react-select'
import CitySelector from './CitySelector/CitySelector'
import WeatherCard from './WeatherCard/WeatherCard'
import ForecastCard from './ForecastCard/ForecastCard'
import WeatherService from '../services/weather'
import WeatherMapper from '../helpers/WeatherMapper'
import './weather.scss';
class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingForeCast: false,
            cityNotFound: false,
            city: null,
            data: null
        };
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.mapper = new WeatherMapper();
    }
    callCurrentWeather = async (city) => {
        this.setState({ isLoading: true, current: null });
        try {
            let response = await WeatherService.getCurrent(city);
            let current = this.mapper.current(response);
            this.setState({ isLoading: false, current });
        } catch (error) {
            this.setState({ cityNotFound: true, isLoading: false });
        }

    }
    callForecastWeather = async (city) => {
        this.setState({ isLoadingForeCast: true, forecast: null });
        try {
            let response = await WeatherService.getForecast(city);
            let forecast = this.mapper.forecastGetFiveDays(response);
            this.setState({ isLoadingForeCast: false, forecast });

        } catch (error) {
            this.setState({ cityNotFound: true, isLoadingForeCast: false });
        }
    }
    getCurrentWeather() {
        if (this.state.current) {
            return <WeatherCard data={this.state.current}></WeatherCard>
        }
    }
    getForecastWeather() {
        if (this.state.forecast) {
            return this.state.forecast.map((item, index) => <ForecastCard key={index} data={item}></ForecastCard>)
        }
    }

    handleChangeCity = city => {
        this.setState({ city });
        this.init(city);
    }
    init(city) {
        this.callCurrentWeather(city);
        this.callForecastWeather(city);
    }
    componentDidMount() {
        this.setState({ cities: this.mapper.getCities() });
        this.init();
    }
    render() {
        const { cityNotFound, isLoading, isLoadingForeCast, cities } = this.state;
        return (
            <div>
                <div className="cities">
                    {cities ? <CitySelector className="select" options={cities} onSelect={this.handleChangeCity} ></CitySelector> : ""}
                </div>
                {cityNotFound ? <h2 className="box failure">No se encontro la ciudad</h2> : ""}
                {!isLoading ? this.getCurrentWeather() : <div className="loader"></div>}
                <div className="Weather">
                    {!isLoadingForeCast ? this.getForecastWeather() : <div className="isLoadingForeCast"></div>}
                </div>
            </div>
        );
    }
}

export default Weather;
