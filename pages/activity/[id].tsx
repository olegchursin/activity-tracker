import prismaClient from '../../utils/prismaClient';
import { Activity } from '@prisma/client';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../../utils/api';
import { RecordType } from '../../utils/constants';
import { useRouter } from 'next/router';

const prisma = prismaClient;

interface IActivityProps {
  activity: Activity;
}

const Activity: React.FC<IActivityProps> = ({ activity }) => {
  const { id, name, type, duration, description, distance } = activity;
  const timestamp = new Date(activity.timestamp).toLocaleString();
  const router = useRouter();

  return (
    <Box>
      <Container maxW="1200px">
        <Heading as="h2">{name}</Heading>

        <Text>{type}</Text>
        <Text>{duration}</Text>
        <Text>{description}</Text>
        <Text>{distance}</Text>
        <Text>{timestamp}</Text>
        <Text>{type}</Text>

        <Button
          colorScheme="pink"
          onClick={() => deleteRecord(id, RecordType.ACTIVITY, router)}
          variant="outline"
        >
          <Flex gap={2} align="center">
            <DeleteIcon />
            <span>Delete Activity</span>
          </Flex>
        </Button>
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const activity = await prisma.activity.findUnique({
    where: { id }
  });
  const serializedActivity = {
    ...activity,
    timestamp: activity.timestamp.toString() as any
  };
  return {
    props: {
      activity: serializedActivity
    }
  };
}

export default Activity;
