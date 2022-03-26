import React from "react";

import { useRouter } from "next/router";

import regions from "../../public/static/regions.json";

import {
  Container,
  Box,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { Search } from "@mui/material/Icon";
import classes from "./Header.module.css";

function Header() {
  
  const router = useRouter()

  const cities = regions.map((region) => {
    return region.region + " " + region.city;
  });

  const autocompleteSelectHandler = (event, value) => {
    const city = value.split(' ').pop()
    router.push(`/region/city/${city}`)
  }

  return (
    <Box className={classes.Header}>
      <Container
        sx={{ margin: "0 auto" }}
        maxWidth="xl"
        className={classes.HeaderContent}
      >
        <CloudIcon sx={{ fontSize: 50 }} color={"primary"} />
        <Autocomplete
          selectOnFocus
          clearOnBlur
          variant={"outlined"}
          size={"small"}
          sx={{ width: "30%" }}
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Поиск по городам"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          onChange={autocompleteSelectHandler}
        />
      </Container>
    </Box>
  );
}

export default Header;
