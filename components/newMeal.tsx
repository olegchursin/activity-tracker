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

const NewMeal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values): Promise<void> {
    const { name, description } = values;

    const timestamp = new Date(values.timestamp);

    await axios.post('/api/addMeal', {
      name,
      description,
      timestamp
    });
    window.location.reload();
  }

  return (
    <>
      <Button colorScheme="pink" onClick={onOpen}>
        <Flex gap={2} align="center">
          <AddIcon />
          <span>Meal</span>
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
            <DrawerHeader borderBottomWidth="1px">Add Meal</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={errors.name}>
                <Stack spacing="24px">
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

                  <Box>
                    <FormLabel htmlFor="type">Type</FormLabel>
                    <Select
                      id="name"
                      defaultValue="breakfast"
                      {...register('name', {
                        required: 'Name is required'
                      })}
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Sack</option>
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

export default NewMeal;
