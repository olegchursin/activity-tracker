import AddOrEditVital from '../components/addOrEditVital';
import VitalsCard from '../components/vitalsCard';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading
} from '@chakra-ui/react';
import prismaClient from '../utils/prismaClient';

const prisma = prismaClient;

const Vitals: React.FunctionComponent<any> = ({ vitals }) => {
  return (
    <Box>
      <Container maxW="1200px">
        <Flex justify="space-between" marginBlockEnd={4}>
          <Heading as="h2">Vitals</Heading>
          <AddOrEditVital />
        </Flex>

        <Grid templateColumns="repeat( auto-fill, minmax(350px, 1fr) )" gap={6}>
          {vitals?.map(vital => {
            return (
              <GridItem key={vital.id} w="100%">
                <VitalsCard vital={vital} key={vital.id} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export async function getServerSideProps() {
  const vitals = await prisma.vital.findMany({
    orderBy: [
      {
        timestamp: 'desc'
      }
    ]
  });
  const serializedVitals = vitals.map(vital => {
    return { ...vital, timestamp: vital.timestamp.toString() as any };
  });

  return {
    props: {
      vitals: serializedVitals
    }
  };
}

export default Vitals;
