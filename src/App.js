import React, { Component } from 'react';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';

const API_KEY = '7e872a7ea9db528616b8a2930d31a394';

class App extends Component{
  state={
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    condition: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},%20${country}&appid=${API_KEY}&units=USCS`);
    const data = await api_call.json();

    if(city && country){
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        condition:data.weather[0].main,
        description: data.weather[0].description,
        error: ''
      });
    }else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter city and country.'
      });
    }
  }
  render(){
    return(
      <div>
        <div className="wrapper">
          <div className='main'>
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                    <Titles />
                </div>
                <div className="col-xs-7 form-container">
                    <Form getWeather={this.getWeather}/>
                    <Weather
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      condition={this.state.condition}
                      description={this.state.description}
                      error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
