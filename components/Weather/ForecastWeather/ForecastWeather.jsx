import React from 'react';

import ForecastToday from '../ForecastToday/ForecastToday'

import {Box, Typography} from '@mui/material'
import classes from '../CurrentWeather/CurrentWeather.module.css'

function Forecast(props) {
  
  let date = props.weather.date.split('-').filter((el, index) => index > 0)
  
  const chanceOfPrecips = props.weather.day.daily_will_it_rain === 1 ? props.weather.day.daily_chance_of_rain : props.weather.day.daily_chance_of_snow
  
  const textOfPrecips = props.weather.day.daily_will_it_rain === 1 ? 'Вероятность дождя': 'Вероятность снега'
  
  return (
    <div>
      <Box className={classes.container}>
        <Box>
          <Typography
            variant={'h4'}
            color={'primary'}
            sx={{borderBottom: '1px solid #eee'}}
          >
            {props.city} {date[1]}.{date[0]}
          </Typography>
        </Box>
        <Box className={classes.CurrentWeather}>
          <Box className={classes.weatherConditionContainer}>
            <Box className={classes.conditionBox}>
              <Typography variant={'h4'} color={'secondary'}>
                {props.weather.day.avgtemp_c}&#8451;
              </Typography>
              <img
                src={props.weather.day.condition.icon}
                alt="weather-condition"
                width={'100px'}
                height={'100px'}
              />
              <Typography variant={'h6'} color={'secondary'}>
                {props.weather.day.condition.text}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.weatherContainer}>
            <Box className={classes.weatherBox}>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'subtitle1'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Максимальная температура:
                  </Typography>
                  {props.weather.day.maxtemp_c}&#8451; | {props.weather.day.maxtemp_f}&#8457;
                </Typography>
              </Box>
              {/*this box*/}
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'subtitle1'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Минимальная температура:
                  </Typography>
                  {props.weather.day.mintemp_c}&#8451; | {props.weather.day.mintemp_f}&#8457;
                </Typography>
              </Box>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'h7'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    УФ-индекс:
                  </Typography>
                  {props.weather.day.uv}
                </Typography>
              </Box>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'h7'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Осадки:
                  </Typography>
                  {props.weather.day.totalprecip_mm} мм.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.weatherBox}>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'subtitle1'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Максимальная скорость ветра:
                  </Typography>
                  {(props.weather.day.maxwind_kph / 3.6).toFixed(1)} м/с | {props.weather.day.maxwind_mph} миль/ч
                </Typography>
              </Box>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'subtitle1'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Видимость:
                  </Typography>
                  {props.weather.day.avgvis_km} км | {props.weather.day.avgvis_miles} миль
                </Typography>
              </Box>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'h7'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    Влажность:
                  </Typography>
                  {props.weather.day.avghumidity}%
                </Typography>
              </Box>
              <Box className={classes.weatherBoxItem}>
                <Typography variant={'h7'} color={'#808080'}>
                  <Typography color={'secondary'} variant={'h6'}>
                    {textOfPrecips}
                  </Typography>
                  {chanceOfPrecips}%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.forecastBox}>
            {props.weather.hour.map(hour => {
              return (
                <ForecastToday
                  key={hour.time}
                  forecast={hour}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Forecast;