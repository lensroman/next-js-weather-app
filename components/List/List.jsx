import React from "react";

import { Box, Link } from "@mui/material";

import classes from "./List.module.css";

function Regions(props) {

  return (
    <div>
      <Box sx={{ mt: "2rem" }}>
          <ul className={classes.list}>
            {props.list.map((item) => {

              let linkHref = null
              
              if (props.regions) {
                linkHref = `region/${item}`
              }

              if (props.cities) {
                linkHref = `city/${item}`
              }

              return (
                <li className={classes.item} key={item}>
                  <Link href={linkHref} className={classes.link}>{item}</Link>
                </li>
              );
            })}
          </ul>
      </Box>
    </div>
  );
}

export default Regions;
