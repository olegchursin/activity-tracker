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
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { AddIcon } from '@chakra-ui/icons';

const NewActivity = () => {
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
    <>
      <Button colorScheme="pink" onClick={onOpen}>
        <Flex gap={2} align="center">
          <AddIcon />
          <span>Activity</span>
        </Flex>
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
                      step="0.1"
                      min="0"
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
                      step="0.1"
                      min="0"
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
              <Button colorScheme="pink" isLoading={isSubmitting} type="submit">
                Add
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default NewActivity;
