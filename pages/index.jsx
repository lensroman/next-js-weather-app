import React, {useEffect, useState} from 'react'

import axiosGeo from '../src/axios-instance-geo'
import {useRouter} from 'next/dist/client/router'

import countries from '../public/static/country.json'
import base from '../public/static/base.json'

import Layout from '../components/Layout/Layout'
import List from '../components/List/List'
import CustomDialog from '../components/CustomDialog/CustomDialog'

import {Typography, Divider} from '@mui/material'

import classes from '../styles/index.module.css'

const Home = () => {
	const router = useRouter()
	
	const [dialogOpen, setDialogOpen] = useState(false)
	const [city, setCity] = useState(null)
	const [country, setCountry] = useState(null)
	
	let countriesArray = []
	
	for (let country of countries) {
		countriesArray.push(country.name)
	}
	
	const dialogClosHandler = () => {
		setDialogOpen(false)
	}
	
	const agreeHandler = () => {
		setDialogOpen(false)
		router.push(`/city/${city}?c=${country}`)
	}
	
	useEffect(() => {
		if (sessionStorage.getItem('geopos') === null) {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(async function (position) {
					const coords = {
						x: position.coords.latitude,
						y: position.coords.longitude
					}
					const cityResponse = await axiosGeo.get('json', {
						params: {
							key: 'c9c8a0b84a36414ba89761eb00a6d1ec',
							q: `${coords.x} ${coords.y}`,
						},
					})
					const city = cityResponse.data.results[0].components.city
					setCity(city)
					const country = cityResponse.data.results[0].components.country
					setCountry(country)
					base.map(el => {
						if (el.name === city && el.countryName === country) {
							setDialogOpen(true)
						}
					})
				})
			}
			sessionStorage.setItem('geopos', 1)
		}
	}, [router, city])
	
	const dialog = (
		<CustomDialog
			city={city}
			open={dialogOpen}
			close={dialogClosHandler}
			agree={agreeHandler}
			disagree={dialogClosHandler}
		/>
	)
	
	return (
		<div className={classes.Home}>
			<Layout>
				<Typography variant={'h5'} color={'primary'} sx={{mt: 2}}>
					Погода по странам
				</Typography>
				<Divider/>
				<List list={countriesArray} category={'country'}/>
				{dialog}
			</Layout>
		</div>
	)
}

export default Home
