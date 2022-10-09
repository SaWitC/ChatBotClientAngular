export * from './file.service';
import { FileService } from './file.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [FileService, WeatherForecastService];
