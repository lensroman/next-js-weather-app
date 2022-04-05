import React, {useEffect, useMemo} from 'react'

import {useRouter} from 'next/router'

import baseJSON from '../../public/static/base.json'

import {
	Container,
	Box,
	Autocomplete,
	TextField,
} from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud'

import classes from './Header.module.css'

function Header() {
	
	const router = useRouter()
	
	const autocompleteSelectHandler = (event, values) => {
		const city = values.split(' ')[values.split(' ').length - 1]
		const region = values.split(' ')
			.filter((el, index) => {
				return index !== 0 && index !== (values.split(' ').length - 1)
			})
			.join(' ')
		const country = values.split(' ')[0]
		router.push(`/city/${city}?c=${country}&r=${region}`)
	}
	
	let baseArray = []
	
	for (let city of baseJSON) {
		baseArray.push(`${city.countryName} ${city.regionName} ${city.name}`)
	}
	
	return (
		<Box className={classes.Header}>
			<Container
				sx={{margin: '0 auto'}}
				maxWidth="xl"
				className={classes.HeaderContent}
			>
				<CloudIcon sx={{fontSize: 50}} color={'primary'}/>
				<Autocomplete
					className={classes.search}
					disableClearable
					variant={'outlined'}
					size={'small'}
					options={baseArray}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Поиск по городам"
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
					onChange={(e, values) => autocompleteSelectHandler(e, values)}
				/>
			</Container>
		</Box>
	)
}

export default Header
