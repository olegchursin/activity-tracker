import axios from 'axios';
import React from 'react';
import { Activity } from '@prisma/client';
import { ActivityType } from '../utils/constants';
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
import {
  ADD_ACTIVITY_API_PATH,
  EDIT_ACTIVITY_API_PATH
} from '../utils/routing';
import { useForm } from 'react-hook-form';
import { getDatetimeDefaultValue } from '../utils/datetime';

const activityTypes = Object.values(ActivityType);

interface IAddOrEditActivityProps {
  readonly activity?: Activity;
}

const AddOrEditActivity: React.FC<IAddOrEditActivityProps> = ({ activity }) => {
  const isNewActivity = !activity;
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

    let params = {
      name,
      type,
      timestamp,
      duration,
      reps,
      distance
    };

    if (!isNewActivity) {
      params = { ...params, id: activity.id } as any;
    }

    const path = isNewActivity ? ADD_ACTIVITY_API_PATH : EDIT_ACTIVITY_API_PATH;

    await axios.post(path, params);
    window.location.reload();
  }

  const createActivityTrigger = (
    <Button colorScheme="pink" onClick={onOpen}>
      <Flex gap={2} align="center">
        <AddIcon />
        <span>Activity</span>
      </Flex>
    </Button>
  );

  const editActivityTrigger = (
    <MenuItem onClick={onOpen} icon={<EditIcon />}>
      Edit
    </MenuItem>
  );

  const trigger = isNewActivity ? createActivityTrigger : editActivityTrigger;
  const actionVerb = isNewActivity ? 'Add' : 'Edit';

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
              {actionVerb} Activity
            </DrawerHeader>

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
                      defaultValue={activity?.name}
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
                      defaultValue={activity?.type ?? ActivityType.BIKING}
                      {...register('type', {
                        required: 'Type is required'
                      })}
                    >
                      {activityTypes.map(type => {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="timestamp">Date and time</FormLabel>
                    <Input
                      id="timestamp"
                      defaultValue={getDatetimeDefaultValue(
                        activity?.timestamp
                      )}
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
                      defaultValue={activity?.duration}
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
                      defaultValue={activity?.distance}
                      type="number"
                      step="0.1"
                      min="0"
                      {...register('distance')}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="reps">Reps</FormLabel>
                    <Input
                      id="reps"
                      defaultValue={activity?.reps}
                      type="number"
                      {...register('reps')}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      id="description"
                      defaultValue={activity?.description}
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

export default AddOrEditActivity;
