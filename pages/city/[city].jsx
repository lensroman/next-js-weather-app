import React, { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/dist/client/router";

import axiosGeo from "../../src/axios-instance-geo";
import axiosWeather from "../../src/axios-instance-weather";

import Layout from "../../components/Layout/Layout";
import CurrentWeather from "../../components/Weather/CurrentWeather/CurrentWeather";

import {Box, Typography, Button, Divider, Tabs, Tab} from '@mui/material'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ForecastWeather from '../../components/Weather/ForecastWeather/ForecastWeather'
import Chart from '../../components/Chart/Chart'


function City() {
  const router = useRouter();

  const city = router.query.city;

  const country = router.query.c;

  const region = router.query.r;

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  
  const [forecast, setForecast] = useState('сейчас')
  
  const hour = new Date().getHours() + 1

  const goBackHandler = () => {
    router.back()
  };
  
  const tabsForecastHandler = (event, newValue) => {
    setForecast(newValue)
  }

  const fetchWeather = useCallback(async () => {
    let coordinatesResponse = null
    if (city && country) {
      coordinatesResponse = await axiosGeo.get("json", {
        params: {
          key: "4c4cea6d3c944752a6f0c6e67aee3033",
          q: `${country} ${city}`,
        },
      })
      if (!coordinatesResponse.data.results[0]) {
        coordinatesResponse = await axiosGeo.get("json", {
          params: {
            key: "4c4cea6d3c944752a6f0c6e67aee3033",
            q: `${country} ${region}`,
          },
        })
      }
      if (!coordinatesResponse.data.results[0]) {
        coordinatesResponse = await axiosGeo.get("json", {
          params: {
            key: "4c4cea6d3c944752a6f0c6e67aee3033",
            q: `${country}`,
          },
        })
      }
      const coordinates = coordinatesResponse.data.results[0].geometry;
      const forecastThreeDaysResponse = await axiosWeather.get(
        "forecast.json",
        {
          params: {
            key: "2b6d59dd339a4bdaa8e110520222803",
            q: `${coordinates.lat},${coordinates.lng}`,
            days: 4,
            lang: "ru",
          },
        }
      )
      await setCurrentWeather(forecastThreeDaysResponse.data.current);
      await setForecastWeather(
        forecastThreeDaysResponse.data.forecast.forecastday
      )
    }
  }, [city, country, region])
  
  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  let weatherBox = null
  
  let chart = null

  if (currentWeather && forecastWeather && hour && forecast === 'сейчас') {
    weatherBox = (
      <CurrentWeather
        city={city}
        hour={hour}
        current
        weather={currentWeather}
        forecast={forecastWeather[0]}
      />
    );
    chart = (
      <Chart forecast={forecastWeather} />
    )
  }
  
  if (forecastWeather && forecast === 'На завтра') {
    weatherBox = (
      <ForecastWeather
        city={city}
        weather={forecastWeather[1]}
      />
    )
    chart = (
      <Chart forecast={forecastWeather} />
    )
  }
  
  if (forecastWeather && forecast === 'На послезавтра') {
    weatherBox = (
      <ForecastWeather
        city={city}
        weather={forecastWeather[2]}
      />
    )
    chart = (
      <Chart forecast={forecastWeather} />
    )
  }
  
  return (
    <div>
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2
          }}
        >
          <Typography variant={"h5"} color={"primary"}>
            Погода в городе {city}
          </Typography>
          <Button
            variant={"outlined"}
            startIcon={<ArrowBackIcon />}
            onClick={goBackHandler}
          >
            Назад
          </Button>
        </Box>
        <Divider sx={{ mt: 1 }}/>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', padding: '1rem' }}>
          <Typography variant={'h5'}>Прогноз</Typography>
          <Tabs sx={{ ml: 2 }} value={forecast} onChange={tabsForecastHandler} variant={'scrollable'} scrollButton allowScrollButtonsMobile>
            <Tab label='сейчас' value={'сейчас'} />
            <Tab label='На завтра' value={'На завтра'} />
            <Tab label='На послезавтра' value={'На послезавтра'} />
          </Tabs>
        </Box>
        {weatherBox}
        {chart}
      </Layout>
    </div>
  )
}

export default City;
