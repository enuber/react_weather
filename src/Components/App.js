import React from 'react';
import Geocode from 'react-geocode';
import openweatherOnecall from '../apis/openweatherOneCall';
import openweatherCurrent from '../apis/openweatherCurrent';
import openWeatherFiveDay from '../apis/openweatherFiveDay';
import ZipcodeInput from './Zipcode_Input';

const KEY = "feacc5a81b3977108efdfca4e81d0b3e";
const KEY_GOOGLE = "AIzaSyCFKscIFBnXk_7E-oqhps7IysgOXjn7NCk";



class App extends React.Component {

    state = {
        currentWeather: {},
        lat: null,
        lng: null
    };

    //uses a call to google api to get lat and long from zipcode. Need these to properly make the call to weather api
    getLocation = async zipcode => {
        Geocode.setApiKey(KEY_GOOGLE);
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
                appid: KEY
            }
        });
        this.setState({currentWeather: response.data});
    };

    onSearchSubmit = async zipcode => {
        await this.getLocation(zipcode);
        await this.getWeather(zipcode);
    };

    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                <ZipcodeInput onSubmit={this.onSearchSubmit}/>
            </div>
        );
    }
}

export default App;