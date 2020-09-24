import React from 'react';
import './WeatherCard.scss';

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
    }

    getIcon(value) {
        return "http://openweathermap.org/img/wn/" + value + "@4x.png";
    }
    render() {
        return (
            <div className="WeatherCard" >
                <h1 className="location" >{this.props.data.city}</h1>
                <h2 className="date" >{this.props.data.date}</h2>
                <img src={this.getIcon(this.props.data.icon)}></img>
                <p className="temp"  >{this.props.data.temperature}°</p>
                <p className="conditions" >{this.props.data.description}</p>
                <p className="wind" >Wind: {this.props.data.wind}</p>
            </div >
        );
    }
}

export default WeatherCard;
