import React, { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/dist/client/router";

import axiosGeo from "../../src/axios-instance-geo";
import axiosWeather from "../../src/axios-instance-weather";

import Layout from "../../components/Layout/Layout";

import { Box, Typography, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CurrentWeather from "../../components/Weather/CurrentWeather/CurrentWeather";

function City() {
  const router = useRouter();

  const city = router.query.city;

  const country = router.query.c;

  const region = router.query.r;

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState({});

  const goBackHandler = () => {
    router.back();
  };

  const fetchWeather = useCallback(async () => {
    let coordinatesResponse = null;
    if (city && country && region) {
      coordinatesResponse = await axiosGeo.get("json", {
        params: {
          key: "c9c8a0b84a36414ba89761eb00a6d1ec",
          q: `${country} ${city}`,
        },
      });
      if (!coordinatesResponse.data.results[0]) {
        coordinatesResponse = await axiosGeo.get("json", {
          params: {
            key: "c9c8a0b84a36414ba89761eb00a6d1ec",
            q: `${country} ${region}`,
          },
        });
      }
      if (!coordinatesResponse.data.results[0]) {
        coordinatesResponse = await axiosGeo.get("json", {
          params: {
            key: "c9c8a0b84a36414ba89761eb00a6d1ec",
            q: `${country}`,
          },
        });
      }
      const coordinates = coordinatesResponse.data.results[0].geometry;
      const forecastThreeDaysResponse = await axiosWeather.get(
        "forecast.json",
        {
          params: {
            key: "7a8146bf0b024038af8122158222703",
            q: `${coordinates.lat},${coordinates.lng}`,
            days: 3,
            lang: "ru",
          },
        }
      );
      await setCurrentWeather(forecastThreeDaysResponse.data.current);
      await setForecastWeather(
        forecastThreeDaysResponse.data.forecast.forecastday
      );
    }
  }, [city, country, region]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  console.log(currentWeather)

  let currentWeatherBox = null;

  if (currentWeather) {
    currentWeatherBox = (
      <CurrentWeather
        city={city}
        conditionIcon={currentWeather.condition.icon}
        conditionText={currentWeather.condition.text}
        tempC={currentWeather.temp_c}
        tempF={currentWeather.temp_f}
        feelslikeC={currentWeather.feelslike_c}
        feelslikeF={currentWeather.feelslike_f}
        precip={currentWeather.precip_mm}
        pressure={(currentWeather.pressure_mb * 0.750062).toFixed(0)}
        windKPH={(currentWeather.wind_kph / 3.6).toFixed(1)}
        windMPH={currentWeather.wind_mph}
        windDir={currentWeather.wind_dir}
        gustKPH={(currentWeather.gust_kph / 3.6).toFixed(1)}
        humidity={currentWeather.humidity}
        uvIndex={currentWeather.uv}
      />
    );
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
            Погода по городу {city}
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
        {currentWeatherBox}
      </Layout>
    </div>
  );
}

export default City;
