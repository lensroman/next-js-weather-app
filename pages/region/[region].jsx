import React, { useEffect } from "react";

import List from '../../components/List/List';
import Layout from "../../components/Layout/Layout";

import regions from "../../public/static/regions.json";

import { Typography, Divider } from '@mui/material';

import { useRouter } from "next/dist/client/router";

function Region(props) {
  const router = useRouter();

  const regionQuery = router.query.region;

  let cities = [];

  if (regionQuery) {
    cities = regions
      .filter((region) => region.region === regionQuery)
      .map((region) => region.city);
  }

  return (
    <div>
      <Layout>
        <Typography variant={"h5"} color={"primary"} sx={{ mt: 2 }}>
          Погода по городам {regionQuery}
        </Typography>
        <Divider />
        <List list={cities} cities />
      </Layout>
    </div>
  );
}

export default Region;
