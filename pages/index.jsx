import React, { useEffect } from "react";

import { useRouter } from "next/router";

import countries from '../public/static/country.json';

import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import List from "../components/List/List";

import { Typography, Divider } from "@mui/material";

import classes from "../styles/index.module.css";

const Home = () => {
  const router = useRouter()

  let countriesArray = []

  for (let country of countries) {
    countriesArray.push(country.name)
  }

  return (
    <div className={classes.Home}>
      <Layout>
        <Typography variant={"h5"} color={"primary"} sx={{ mt: 2 }}>
            Погода по странам
          </Typography>
        <Divider />
        <List list={countriesArray} category={'country'} />
      </Layout>
    </div>
  );
};

export default Home;
