import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '644feed28f3d1397f094ed44ea6c5898';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string) {
   
    return this.http.get(this.apiUrl+city+"&APPID="+this.apiKey);
  }
}
