import React from 'react';
import WeatherService from '../services/weather'

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", hora: "" };
        this.handleChange = this.handleChange.bind(this);

    }
    renderProduct = () => {
        return <h1>status: {this.state.hora}</h1>;
    };
    renderTitle = (name) => {
        if (name) {
            return <h2>Hello, {name}!</h2>
        }
    };

    getProducts = async () => {
        let res = await WeatherService.getAll();
        this.setState({ hora: res.status });
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }
    componentDidMount() {
        this.getProducts();
    }
    render() {
        return (
            <div>
                {this.renderProduct()}
                <form>
                    <label>
                        Add Name -  <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    </label>
                </form>
                {this.renderTitle(this.state.name)}
            </div>
        );
    }
}

export default Weather;