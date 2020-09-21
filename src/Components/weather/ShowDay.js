import './ShowDay.css';
import React from 'react';
import history from '../../history';


class showDay extends React.Component {

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


    renderChosenDay() {
        console.log(this.props);
        if (this.props.dayWeather.dt) {
            const {city, state, zip, dayWeather} = this.props;
            const icon = "http://openweathermap.org/img/w/" + dayWeather.weather[0].icon + ".png";
            const day = this.convertUTC(`${dayWeather.dt}`, 'weekday', 'long');
            const sunrise = this.convertUTC(`${dayWeather.sunrise}`, 'time', 'short');
            const sunset = this.convertUTC(`${dayWeather.sunset}`, 'time', 'short');
            return (
                <section className="currentDate" key={dayWeather.dt}>
                    <div className="column50">
                        <div className="location">{`${city}, ${state} ${zip}`}</div>
                        <div className="day">{day}</div>
                        <div className="weatherDescription">{dayWeather.weather[0].description}</div>
                        <div><img className="weatherIcon" src={`${icon}`} alt="weather icon"/> <span
                            className="temperature">{`${Math.round(dayWeather.temp.day)}`}</span><span
                            className="degree">&deg;</span><span className="farenheit">{`F`}</span></div>
                    </div>
                    <div className="column50">
                        <div className="sunTime">{`Sunrise: ${sunrise}`}</div>
                        <div className="sunTime">{`Sunset: ${sunset}`}</div>
                    </div>
                </section>
            )
        }
    }

    render() {
        return(
            <div className="dayContainer">
                {this.renderChosenDay()}
            </div>
        )
    }
};

export default showDay;