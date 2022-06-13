import ActivityCard from '../components/activityCard';
import axios from 'axios';
import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { PrismaClient } from '@prisma/client';
import { useForm } from 'react-hook-form';

const prisma = new PrismaClient();

const Activities: React.FunctionComponent<any> = ({ activities }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values): Promise<void> {
    const { name, type } = values;
    const duration = parseFloat(values.duration);
    const reps = parseFloat(values.reps);
    const distance = parseFloat(values.distance);
    const timestamp = new Date(values.timestamp);

    await axios.post('/api/addActivity', {
      name,
      type,
      timestamp,
      duration,
      reps,
      distance
    });
    window.location.reload();
  }

  return (
    <Box>
      <Heading as="h2" size="l">
        Activities
      </Heading>

      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {activities?.map(activity => {
          return (
            <GridItem key={activity.id} w="100%">
              <ActivityCard activity={activity} />
            </GridItem>
          );
        })}
      </Grid>

      <Button colorScheme="teal" onClick={onOpen}>
        Add Activity
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add Activity</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={errors.name}>
                <Stack spacing="24px">
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

                  <Box>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      placeholder="Name"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4'
                        }
                      })}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <Select
                      id="type"
                      defaultValue="biking"
                      {...register('type', {
                        required: 'Type is required'
                      })}
                    >
                      <option value="biking">Biking</option>
                      <option value="pushups">Pushups</option>
                      <option value="pullups">Pullups</option>
                      <option value="swimming">Swimming</option>
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="timestamp">Date and time</FormLabel>
                    <Input
                      id="timestamp"
                      type="datetime-local"
                      min="2022-06-01T00:00"
                      {...register('timestamp', {
                        required: 'Date and time are required'
                      })}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="duration">Duration</FormLabel>
                    <Input
                      id="duration"
                      type="number"
                      {...register('duration', {
                        required: 'Duration is required'
                      })}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="distance">Distance</FormLabel>
                    <Input
                      id="distance"
                      type="number"
                      {...register('distance')}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="reps">Reps</FormLabel>
                    <Input id="reps" type="number" {...register('reps')} />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea id="description" {...register('description')} />
                  </Box>
                </Stack>
              </FormControl>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </Box>
  );
};

export async function getServerSideProps() {
  const activities = await prisma.activity.findMany();
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
