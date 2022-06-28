import { Box, Container, Flex, Heading } from '@chakra-ui/react';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Box>
      <Container maxW="1200px">
        <Flex justify="space-between" marginBlockEnd={4}>
          <Heading as="h1">Simple Activity tracker</Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
