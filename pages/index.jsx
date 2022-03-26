import React from 'react';

import regions from "../public/static/regions.json";

import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import List from '../components/List/List';

import { Typography, Divider } from '@mui/material';

import classes from '../styles/index.module.css';

const Home = () => {

  const regionsSet = new Set();

  regions.forEach((region) => {
    regionsSet.add(region.region);
  });

  const regionsArray = Array.from(regionsSet);

  return (
    <div className={classes.Home}>
      <Layout>
        <Typography variant={"h5"} color={"primary"} sx={{ mt: 2 }}>
          Погода по регионам России
        </Typography>
        <Divider />
        <List list={regionsArray} regions />
      </Layout>
    </div>
  )
}

export default Home;
