import React from "react";

import { useRouter } from "next/dist/client/router";

import { Box, Link } from "@mui/material";

import classes from "./List.module.css";

function List(props) {
  const router = useRouter();

  const routerHandler = (event, item) => {
    let path = null
    switch(props.category) {
      case 'region': {
        path = `/region/${item}?c=${router.query.country}`
        break
      }
      case 'country': {
        path = `/country/${item}`
        break
      }
      case 'city': {
        path = `/city/${item}?c=${router.query.c}&r=${router.query.region}`
      }
    }
    event.preventDefault()
    router.push(path);
  };

  return (
    <div>
      <Box sx={{ mt: "2rem" }}>
        <ul className={classes.list}>
          {props.list.map((item) => {
            return (
              <li className={classes.item} key={item}>
                <Link
                  href="/"
                  className={classes.link}
                  onClick={(event) => routerHandler(event, item)}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </Box>
    </div>
  );
}

export default List;
