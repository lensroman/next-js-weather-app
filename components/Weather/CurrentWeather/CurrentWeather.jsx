import React from "react";

import { Box, Typography, Divider } from "@mui/material";

import classes from "./CurrentWeather.module.css";

function CurrentWeather(props) {
  return (
    <div>
      <Box className={classes.CurrentWeather}>
        <Typography
          variant={"h4"}
          color={"primary"}
          sx={{ borderBottom: "1px solid #eee" }}
        >
          {props.city} сейчас
        </Typography>
        <Box className={classes.weatherContainer}>
          <Box className={classes.conditionBox}>
            <Typography variant={"h4"} color={"secondary"}>
              {props.tempC}&#8451;
            </Typography>
            <img
              src={props.conditionIcon}
              alt="weather-condition"
              width={"100px"}
              height={"100px"}
            />
            <Typography variant={"h6"} color={"secondary"}>
              {props.conditionText}
            </Typography>
          </Box>
          <Box className={classes.weatherBox}>
            <Typography variant={"subtitle1"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Температура:
              </Typography>
              {props.tempC}&#8451; | {props.tempF}&#8457;
            </Typography>
            <Typography variant={"subtitle1"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Ощущается как:
              </Typography>
              {props.feelslikeC}&#8451; | {props.feelslikeF}&#8457;
            </Typography>
          </Box>
          <Box className={classes.weatherBox}>
            <Typography variant={"subtitle1"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Скорость ветра:
              </Typography>
              {props.windKPH} м/с | {props.windMPH} миль/ч 
            </Typography>
            <Typography variant={"subtitle1"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Порывы до:
              </Typography>
              {props.gustKPH} м/с
            </Typography>
            <Typography variant={"subtitle1"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Направление ветра:
              </Typography>
              {props.windDir}
            </Typography>
          </Box>
          <Box className={classes.weatherBox}>
            <Typography variant={"h7"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Осадки:
              </Typography>
              {props.precip} мм.
            </Typography>
            <Typography variant={"h7"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Давление:
              </Typography>
              {props.pressure} мм.рт.ст
            </Typography>
          </Box>
          <Box className={classes.weatherBox}>
            <Typography variant={"h7"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                Влажность:
              </Typography>
              {props.humidity}%
            </Typography>
            <Typography variant={"h7"} color={"#808080"} paragraph>
              <Typography color={"secondary"} variant={"h6"}>
                УФ-индекс:
              </Typography>
              {props.uvIndex}
            </Typography>
            <Typography variant={"h6"} color={"#808080"}></Typography>
            <Typography variant={"h6"} color={"#808080"}></Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CurrentWeather;
