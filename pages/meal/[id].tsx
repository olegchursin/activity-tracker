import prismaClient from '../../utils/prismaClient';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../../utils/api';
import { Meal } from '@prisma/client';
import { RecordType } from '../../utils/constants';
import { useRouter } from 'next/router';

const prisma = prismaClient;

interface IMealProps {
  meal: Meal;
}

const Meal: React.FC<IMealProps> = ({ meal }) => {
  const { id, name, description } = meal;
  const timestamp = new Date(meal.timestamp).toLocaleString();
  const router = useRouter();

  return (
    <Box>
      <Container maxW="1200px">
        <Heading as="h2">{name}</Heading>

        <Text>{timestamp}</Text>
        <Text>{description}</Text>

        <Button
          colorScheme="pink"
          onClick={() => deleteRecord(id, RecordType.MEAL, router)}
          variant="outline"
        >
          <Flex gap={2} align="center">
            <DeleteIcon />
            <span>Delete Meal</span>
          </Flex>
        </Button>
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const meal = await prisma.meal.findUnique({
    where: { id }
  });
  const serializedMeal = {
    ...meal,
    timestamp: meal.timestamp.toString() as any
  };
  return {
    props: {
      meal: serializedMeal
    }
  };
}

export default Meal;
