import React from 'react';

class showWeather extends React.Component {

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
            default:
                return dateObj.toLocaleString("en-US", {weekday: typeArg})
        }

    }

    renderCurrent() {
        const current = this.props.allWeather.current;
        // console.log(current);
        // if (!current) {
        //     return <div>Loading...</div>
        // }
        const day = this.convertUTC(`${current.dt}`, 'weekday', 'short');
        return (
            <div className="item" key={current.dt}>
                <div>
                    {day}
                </div>
                <div>
                    {current.temp}
                </div>
            </div>
        )
    }

    // renderList() {
    //     console.log(this.props.allWeather);
    //     return this.props.allWeather.daily.map(day => {
    //         return (
    //             <div className="item" key={stream.id}>
    //                 {this.renderAdmin(stream)}
    //                 <i className="large middle aligned icon camera"/>
    //                 <div className="content">
    //                     <Link to={`/streams/show/${stream.id}`}>
    //                         {stream.title}
    //                     </Link>
    //                     <div className="description">{stream.description}</div>
    //                 </div>
    //             </div>
    //         )
    //     });
    // }

    render() {
        console.log(this.props);
        debugger;
        if (!this.props.allWeather.current) {
            return (
                <div>
                    <h2>Forecast</h2>
                    <div>Waiting for ZIP code</div>
                </div>
            )
        }
        return(
            <div>
                <h2>Forecast</h2>
                <div className="ui celled list">
                    {this.renderCurrent()}
                </div>
            </div>
        )
    }
}

export default showWeather;