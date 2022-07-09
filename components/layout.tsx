import Footer from './footer';
import Head from 'next/head';
import Navbar from './navbar';
import React from 'react';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

const Layout = ({ children }) => {
  const bg = useColorModeValue('gray.50', 'blackAlpha.700');

  return (
    <>
      <Head>
        <title>Simple Activity tracker</title>
        <meta
          name="description"
          content="Oleg Chursin - Simple Activity tracker"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid minH="100%" templateRows="1fr auto">
        <GridItem position="relative">
          <Box paddingBlockStart={32} paddingBlockEnd={24} as="main" bg={bg}>
            {children}
          </Box>
          <Navbar />
        </GridItem>

        <GridItem rowStart={2} rowEnd={3}>
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
