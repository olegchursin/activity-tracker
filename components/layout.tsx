import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }) => {
  const bg = useColorModeValue('gray.50', 'blackAlpha.600');

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

      <Navbar />
      <Box paddingBlockStart={8} paddingBlockEnd={24} as="main" bg={bg}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
