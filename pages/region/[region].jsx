import React from 'react';

import { useRouter } from "next/dist/client/router";

import regionsJSON from '../../public/static/region.json';
import citiesJSON from '../../public/static/city.json';

import List from "../../components/List/List";
import Layout from "../../components/Layout/Layout";

import { Box, Typography, Divider, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Region() {

  const router = useRouter()

  const countryQuery = router.query.c

  const regionQuery = router.query.region

  let cities = []

  let regionId = null

  for (let region of regionsJSON) {
    if (region.name === regionQuery) {
      regionId = region.region_id
    }
  }

  for (let city of citiesJSON) {
    if (city.region_id === regionId) {
      cities.push(city.name)
    }
  }

  const goBackHandler = () => {
    router.back();
  };

  return (
    <div>
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={"h5"} color={"primary"} sx={{ mt: 2 }}>
            Погода по городам региона {regionQuery}
          </Typography>
          <Button
            variant={"outlined"}
            startIcon={<ArrowBackIcon />}
            onClick={goBackHandler}
          >
            Назад
          </Button>
        </Box>
        <Divider />
        <List list={cities} category={'city'} />
      </Layout>
    </div>
  );
}

export default Region;
