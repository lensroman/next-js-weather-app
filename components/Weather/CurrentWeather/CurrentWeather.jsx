import React from 'react'

import ForecastToday from '../ForecastToday/ForecastToday'

import {Box, Typography, Divider} from '@mui/material'

import classes from './CurrentWeather.module.css'

function CurrentWeather(props) {
	return (
		<div>
			<Box className={classes.container}>
				<Box sx={{ padding: '1rem' }}>
					<Typography
						variant={'h4'}
						color={'primary'}
						sx={{borderBottom: '1px solid #eee'}}
					>
						{props.city} сейчас
					</Typography>
				</Box>
				<Box className={classes.CurrentWeather}>
					<Box className={classes.weatherConditionContainer}>
						<Box className={classes.conditionBox}>
							<Typography variant={'h4'} color={'secondary'}>
								{props.weather.temp_c}&#8451;
							</Typography>
							<img
								src={props.weather.condition.icon}
								alt="weather-condition"
								width={'100px'}
								height={'100px'}
							/>
							<Typography variant={'h6'} color={'secondary'}>
								{props.weather.condition.text}
							</Typography>
						</Box>
					</Box>
					<Box className={classes.weatherContainer}>
						<Box className={classes.weatherBox}>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'subtitle1'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Температура:
									</Typography>
									{props.weather.temp_c}&#8451; | {props.weather.temp_f}&#8457;
								</Typography>
							</Box>
							{/*this box*/}
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'subtitle1'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Ощущается как:
									</Typography>
									{props.weather.feelslike_c}&#8451; | {props.weather.feelslike_f}&#8457;
								</Typography>
							</Box>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'h7'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										УФ-индекс:
									</Typography>
									{props.weather.uv}
								</Typography>
							</Box>
						</Box>
						<Box className={classes.weatherBox}>
							{/*this box*/}
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'subtitle1'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Скорость ветра:
									</Typography>
									{(props.weather.wind_kph / 3.6).toFixed(1)} м/с | {props.weather.wind_mph} миль/ч
								</Typography>
							</Box>
							{/*this box*/}
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'subtitle1'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Порывы до:
									</Typography>
									{(props.weather.gust_kph / 3.6).toFixed(1)} м/с
								</Typography>
							</Box>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'subtitle1'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Направление ветра:
									</Typography>
									{props.weather.wind_dir}
								</Typography>
							</Box>
						</Box>
						{/*this box*/}
						<Box className={classes.weatherBox}>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'h7'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Осадки:
									</Typography>
									{props.weather.precip_mm} мм.
								</Typography>
							</Box>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'h7'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Давление:
									</Typography>
									{(props.weather.pressure_mb * 0.750062).toFixed(0)} мм.рт.ст
								</Typography>
							</Box>
							<Box className={classes.weatherBoxItem}>
								<Typography variant={'h7'} color={'#808080'}>
									<Typography color={'secondary'} variant={'h6'}>
										Влажность:
									</Typography>
									{props.weather.humidity}%
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box className={classes.forecastBox}>
						{props.forecast.hour.map(hour => {
							if (+hour.time.split(' ')[1].split(':')[0] >= props.hour) {
								return (
									<ForecastToday
										key={hour.time}
										forecast={hour}
									/>
								)
							}
						})}
					</Box>
				</Box>
			</Box>
		</div>
	)
}

export default CurrentWeather
