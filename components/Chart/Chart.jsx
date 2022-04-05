import React from 'react'

import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'

function Chart(props) {
	
	const daysOfWeek = {
		0: 'Вс',
		1: 'Пн',
		2: 'Вт',
		3: 'Ср',
		4: 'Чт',
		5: 'Пт',
		6: 'Сб',
	}
	
	const dates = props.forecast.map(el => {
		return el.date
	})
	
	const whichDay = (date) => {
		let momentDate = moment(date)
		return daysOfWeek[momentDate.weekday()]
	}
	
	const axiosDates = dates.map(el => {
		return `${whichDay(el)} ${el.split('-')[2]}.${el.split('-')[1]}`
	})
	
	const dayTemperature = props.forecast.map(day => {
		return day.hour[12].temp_c
	})
	
	const nightTemperature = props.forecast.map(day => {
		return day.hour[0].temp_c
	})
	
	console.log(dayTemperature)
	
	const options = {
		chart: {
			type: 'spline'
		},
		title: {
			text: `Дневная и ночная температура`
		},
		series: [
			{
				name: 'День',
				color: '#f4a213',
				data: dayTemperature
			},
			{
				name: 'Ночь',
				color: '#1607ef',
				data: nightTemperature
			}
		],
		yAxis: {
			title: {
				text: 'Температура &#8451;'
			}
		},
		xAxis: {
			categories: axiosDates
		}
	}
	
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	)
}

export default Chart
