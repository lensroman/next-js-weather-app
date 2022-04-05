import React from 'react'

import { Box, Typography } from '@mui/material'

import classes from './ForecastToday.module.css'

function ForecastToday(props) {
	
	const time = props.forecast.time.split(' ')[1]
	
	return (
		<div>
			<Box className={classes.hourForecast}>
				<Typography
					sx={{display: 'flex', alignItems: 'center'}}
					variant={'h6'}
				>
					{time}
					<img
						src={props.forecast.condition.icon}
						alt=""
					/>
				</Typography>
				<Typography
					variant={'h6'}
				>
					{props.forecast.temp_c}&#8451;
				</Typography>
			</Box>
		</div>
	)
}

export default ForecastToday
