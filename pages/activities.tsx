import ActivityCard from '../components/activityCard';
import AddOrEditActivity from '../components/addOrEditActivity';
import prismaClient from '../utils/prismaClient';
import React from 'react';
import { Activity } from '@prisma/client';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading
} from '@chakra-ui/react';

const prisma = prismaClient;

interface IActivitiesProps {
  activities: Activity[];
}

const Activities: React.FunctionComponent<IActivitiesProps> = ({
  activities
}) => {
  return (
    <Box>
      <Container maxW="1200px">
        <Flex justify="space-between" marginBlockEnd={4}>
          <Heading as="h2">Activities</Heading>
          <AddOrEditActivity />
        </Flex>

        <Grid templateColumns="repeat( auto-fill, minmax(350px, 1fr) )" gap={6}>
          {activities?.map(activity => {
            return (
              <GridItem key={activity.id} w="100%">
                <ActivityCard activity={activity} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export async function getServerSideProps() {
  const activities = await prisma.activity.findMany({
    orderBy: [
      {
        timestamp: 'desc'
      }
    ]
  });
  const serializedActivities = activities.map(activity => {
    return { ...activity, timestamp: activity.timestamp.toString() as any };
  });

  return {
    props: {
      activities: serializedActivities
    }
  };
}

export default Activities;
