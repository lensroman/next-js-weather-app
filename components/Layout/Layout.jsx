import React, { Fragment } from 'react';

import Header from '../Header/Header';

import { Container } from '@mui/material';

function Layout(props) {
  return (
    <Fragment>
      <Header/>
      <Container sx={{ margin: '0 auto' }} maxWidth='xl' >
      {props.children}
    </Container>
    </Fragment>
  );
}

export default Layout;
