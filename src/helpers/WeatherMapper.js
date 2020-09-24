class WeatherMapper {
    current(data) {
        return {
            city: data.name,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            description: data.weather[0].description,
            wind: data.wind.speed,
            date: new Date(data.dt * 1000).toDateString()
        }
    };
    forecastGetFiveDays(data) {
        let days = []
        for (let i = 0; i < 5; i++) {
            days.push(this.current(data.list[8 * i]))
        }
        return days
    };
    getCities() {
        return [{ label: "Tokyo", value: "Tokyo" },
        { label: "Helsinki", value: "helsinki" },
        { label: "London", value: "London" },
        { label: "Shanghai", value: "Shanghai" },
        { label: "San Francisco", value: "San Francisco" }]
    }
}
export default WeatherMapper;
