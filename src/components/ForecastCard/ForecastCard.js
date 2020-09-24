import React from 'react';
import './ForecastCard.scss';
class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
    }
    getIcon(value) {
        return "http://openweathermap.org/img/wn/" + value + "@2x.png";
    }
    render() {
        return (
            <div className="ForecastCard">
                <h3 className="daytop">{this.props.data.date}</h3>

                <img src={this.getIcon(this.props.data.icon)}></img>

                <h3 className="daybottom" >{this.props.data.date}</h3>
                <p className="conditions" >{this.props.data.description}</p>
                <p className="tempRange" ><span className="high" >{this.props.data.temperature}</span> | <span className="low" >Wind: {this.props.data.wind}</span></p>
            </div>
        );
    }
}

export default WeatherCard;
