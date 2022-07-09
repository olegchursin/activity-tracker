import axios from 'axios';
import React from 'react';
import {
  ADD_MEAL_API_PATH,
  EDIT_MEAL_API_PATH,
  MEALS_PATH
} from '../utils/routing';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
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
  MenuItem,
  Select,
  Stack,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { getDatetimeDefaultValue } from '../utils/datetime';
import { Meal } from '@prisma/client';
import { MealType } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const mealTypes = Object.values(MealType);

interface IAddOrEditMealProps {
  meal?: Meal;
}

const AddOrEditMeal: React.FC<IAddOrEditMealProps> = ({ meal }) => {
  const isNewMeal = !meal;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values): Promise<void> {
    const { name, description } = values;
    const timestamp = new Date(values.timestamp);

    const newMealParams = {
      name,
      description,
      timestamp
    };
    let params = newMealParams;
    if (!isNewMeal) {
      params = { ...params, id: meal.id } as any;
    }

    const path = isNewMeal ? ADD_MEAL_API_PATH : EDIT_MEAL_API_PATH;
    await axios.post(path, params);
    onClose();
    router.push(MEALS_PATH);
  }

  const newMealTrigger = (
    <Button colorScheme="pink" onClick={onOpen}>
      <Flex gap={2} align="center">
        <AddIcon />
        <span>Meal</span>
      </Flex>
    </Button>
  );

  const existingMealTrigger = (
    <MenuItem onClick={onOpen} icon={<EditIcon />}>
      Edit
    </MenuItem>
  );

  const trigger = isNewMeal ? newMealTrigger : existingMealTrigger;
  const actionVerb = isNewMeal ? 'Add' : 'Edit';

  return (
    <>
      {trigger}

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
            <DrawerHeader borderBottomWidth="1px">
              {actionVerb} Meal
            </DrawerHeader>

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
                      defaultValue={meal?.name ?? MealType.BREAKFAST}
                      {...register('name', {
                        required: 'Name is required'
                      })}
                    >
                      {mealTypes.map(type => {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="timestamp">Timestamp</FormLabel>
                    <Input
                      id="timestamp"
                      defaultValue={getDatetimeDefaultValue(meal?.timestamp)}
                      type="datetime-local"
                      min="2022-06-01T00:00"
                      {...register('timestamp', {
                        required: 'Timestamp is required'
                      })}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      id="description"
                      defaultValue={meal?.description}
                      {...register('description')}
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
                {actionVerb}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default AddOrEditMeal;
