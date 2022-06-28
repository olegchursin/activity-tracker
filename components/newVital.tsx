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
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { AddIcon } from '@chakra-ui/icons';

const NewVital = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values): Promise<void> {
    const { name } = values;
    const value = parseFloat(values.value);
    const timestamp = new Date(values.timestamp);

    await axios.post('/api/addVital', {
      name,
      value,
      timestamp
    });
    window.location.reload();
  }

  return (
    <>
      <Button colorScheme="pink" onClick={onOpen}>
        <Flex gap={2} align="center">
          <AddIcon />
          <span>Vital</span>
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
            <DrawerHeader borderBottomWidth="1px">Add Vital</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={errors.name}>
                <Stack spacing="24px">
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

                  <Box>
                    <FormLabel htmlFor="type">Name</FormLabel>
                    <Select
                      id="name"
                      defaultValue="weight"
                      {...register('name', {
                        required: 'Name is required'
                      })}
                    >
                      <option value="weight">Weight</option>
                      <option value="sleep">Sleep</option>
                      <option value="pulse">Pulse</option>
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
                    <FormLabel htmlFor="value">Value</FormLabel>
                    <Input
                      id="value"
                      type="number"
                      step="0.1"
                      min="0"
                      {...register('value')}
                    />
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

export default NewVital;
