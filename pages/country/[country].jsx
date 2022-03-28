import React, { useEffect } from "react";

import List from "../../components/List/List";
import Layout from "../../components/Layout/Layout";

import regionsJSON from "../../public/static/region.json";
import countriesJSON from '../../public/static/country.json';

import { Box, Typography, Divider, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/dist/client/router";

function Country() {
  const router = useRouter();

  const countryQuery = router.query.country;

  let countryId = null

  let regions = [];

  for (let country of countriesJSON) {
    if (country.name === countryQuery) {
      countryId = country.country_id
    }
  }

  for(let region of regionsJSON) {
    if (region.country_id === countryId) {
      regions.push(region.name)
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
            Погода по регионам страны {countryQuery}
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
        <List list={regions} category={'region'} />
      </Layout>
    </div>
  );
}

export default Country;
