import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import ShowWeather from './weather/ShowWeather';
import ShowHourly from './weather/ShowHourly';
import Header from './Header';
import ZipcodeInput from './Zipcode_Input';
import Keys from '../config.json';

class App extends React.Component {

    state = {
        currentWeather: {},
        lat: null,
        lng: null
    };

    //uses a call to google api to get lat and long from zipcode. Need these to properly make the call to weather api
    getLocation = async zipcode => {
        Geocode.setApiKey(Keys.keys[0].google);
        await Geocode.fromAddress(zipcode).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({lat: lat, lng: lng});
                console.log(this.state.lat, this.state.lng)
            }
        )
    };

    //this happens after the getLocation finishes making it's call so we can use the lat and lng to get weather data
    getWeather = async () => {
        const response = await openweatherOnecall.get('', {
            params: {
                lat: this.state.lat,
                lon: this.state.lng,
                exclude: "minutely",
                units: "imperial",
                appid: Keys.keys[0].openweather
            }
        });
        debugger;
        this.setState({currentWeather: response.data});
    };

    onSearchSubmit = async zipcode => {
        await this.getLocation(zipcode);
        await this.getWeather(zipcode);
    };

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <Router history={history}>
                    <Header/>
                    <ZipcodeInput onSubmit={this.onSearchSubmit}/>
                    <Switch>
                        <Route path="/" exact render={()=> <ShowWeather allWeather={this.state.currentWeather} />} />
                        <Route path="/weather/:day" component={ShowHourly} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;