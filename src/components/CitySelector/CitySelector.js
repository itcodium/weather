import React from 'react';
import './CitySelector.scss';
class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: null };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.onSelect(event.target.value)
    }
    render() {
        const { value } = this.state;
        return (
            <select className="select-css" value={value} onChange={this.handleChange}>
                <option value="">seleccionar</option>
                {this.props.options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        );
    }
}

export default CitySelector;
