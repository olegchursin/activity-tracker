import MealCard from '../components/mealCard';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading
} from '@chakra-ui/react';
import { PrismaClient } from '@prisma/client';
import NewMeal from '../components/addOrEditMeal';

const prisma = new PrismaClient();

const Meals: React.FunctionComponent<any> = ({ meals }) => {
  return (
    <Box>
      <Container maxW="1200px">
        <Flex justify="space-between" marginBlockEnd={4}>
          <Heading as="h2">Meals</Heading>
          <NewMeal />
        </Flex>

        <Grid templateColumns="repeat( auto-fill, minmax(350px, 1fr) )" gap={6}>
          {meals?.map(meal => {
            return (
              <GridItem key={meal.id} w="100%">
                <MealCard meal={meal} key={meal.id} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export async function getServerSideProps() {
  const meals = await prisma.meal.findMany({
    orderBy: [
      {
        timestamp: 'desc'
      }
    ]
  });
  const serializedMeals = meals.map(meal => {
    return { ...meal, timestamp: meal.timestamp.toString() as any };
  });

  return {
    props: {
      meals: serializedMeals
    }
  };
}

export default Meals;
