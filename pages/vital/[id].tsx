import prismaClient from '../../utils/prismaClient';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../../utils/api';
import { RecordType } from '../../utils/constants';
import { useRouter } from 'next/router';
import { Vital } from '@prisma/client';

const prisma = prismaClient;

interface IVitalProps {
  vital: Vital;
}

const Vital: React.FC<IVitalProps> = ({ vital }) => {
  const { id, name, value } = vital;
  const timestamp = new Date(vital.timestamp).toLocaleString();
  const router = useRouter();

  return (
    <Box>
      <Container maxW="1200px">
        <Heading as="h2">{name}</Heading>

        <Text>{timestamp}</Text>
        <Text>{value}</Text>

        <Button
          colorScheme="pink"
          onClick={() => deleteRecord(id, RecordType.VITAL, router)}
          variant="outline"
        >
          <Flex gap={2} align="center">
            <DeleteIcon />
            <span>Delete Vital</span>
          </Flex>
        </Button>
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const vital = await prisma.vital.findUnique({
    where: { id }
  });
  const serializedVital = {
    ...vital,
    timestamp: vital.timestamp.toString() as any
  };
  return {
    props: {
      vital: serializedVital
    }
  };
}

export default Vital;
