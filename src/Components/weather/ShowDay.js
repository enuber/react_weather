import './ShowDay.css';
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';


class showDay extends React.Component {

    //makes sure that if there is no data, it pushes to home so that there are no errors thrown.
    componentDidMount() {
        if(!this.props.dayWeather.dt) {
            history.push('/');
        }
    }
    //note descArg is type of info needed like weekday, month, year, hour, minute, second or timeZoneName
    //typeArg describes what type of info is needed long, short, numeric
    convertUTC(num, descArg, typeArg) {
        const milliseconds = num * 1000;
        const dateObj = new Date(milliseconds);

        switch(descArg) {
            case 'weekday':
                return dateObj.toLocaleString("en-US", {weekday: typeArg});
            case 'hour':
                return dateObj.toLocaleString("en-US", {hour: typeArg});
            case 'time':
                return dateObj.toLocaleTimeString("en-US", {timeStyle: typeArg});
            default:
                return dateObj.toLocaleString("en-US", {weekday: typeArg})
        }
    }

    degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    renderChosenDay() {
        console.log(this.props);
        if (this.props.dayWeather.dt) {
            const {city, state, zip, dayWeather} = this.props;
            const icon = "http://openweathermap.org/img/w/" + dayWeather.weather[0].icon + ".png";
            const day = this.convertUTC(`${dayWeather.dt}`, 'weekday', 'long');
            const sunrise = this.convertUTC(`${dayWeather.sunrise}`, 'time', 'short');
            const sunset = this.convertUTC(`${dayWeather.sunset}`, 'time', 'short');
            const windDirection = this.degToCompass(dayWeather.wind_deg);
            const windInformation = `${windDirection} ${Math.round(dayWeather.wind_speed)}mph`;
            console.log(windInformation);
            return (
                <section className="currentDate" key={dayWeather.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{dayWeather.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(dayWeather.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span>
                        </div>
                        <div>
                            <span className="temperatureMax">{`Max Temperature: ${Math.round(dayWeather.temp.max)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F   `}</span>
                        </div>
                        <div>
                            <span className="temperatureMin">{`Min Temperature: ${Math.round(dayWeather.temp.min)}`}</span><span
                            className="degreeSmall">&deg;</span><span className="farenheitSmall">{`F`}</span>
                        </div>
                    </div>
                    <div className="column50">
                        <div>{`Clouds: ${Math.round(dayWeather.clouds)}%`}</div>
                        <div>{`Wind: ${windInformation}`}</div>
                        <div>{`Humidity: ${dayWeather.humidity}%`}</div>
                        <div>{`Sunrise: ${sunrise}`}</div>
                        <div>{`Sunset: ${sunset}`}</div>
                    </div>
                </section>
            )
        }
    }

    render() {
        return(
            <div className="section">
                <h2>Forecast</h2>
                <div className="dayContainer">
                    {this.renderChosenDay()}
                </div>
                <Link to={`/`} className="button">Back To Current Weather</Link>
            </div>
        )
    }
};

export default showDay;