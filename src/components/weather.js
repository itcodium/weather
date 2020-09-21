import React from 'react';
import WeatherService from '../services/weather'

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "unknow", hora: "" };
        this.handleChange = this.handleChange.bind(this);

    }
    renderProduct = () => {
        return <h1>status: {this.state.hora}</h1>;
    };

    getProducts = async () => {
        let res = await WeatherService.getAll();
        console.log(' res: ', res);
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
                <h2>Hello, {this.state.name}!</h2>
                <form>
                    <label>
                        Change name: <br></br>
                        <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        );
    }
}

export default Weather;