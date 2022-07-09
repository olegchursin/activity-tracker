import axios from 'axios';
import React from 'react';
import {
  ADD_VITAL_API_PATH,
  EDIT_VITAL_API_PATH,
  VITALS_PATH
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
  useDisclosure
} from '@chakra-ui/react';
import { getDatetimeDefaultValue } from '../utils/datetime';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Vital } from '@prisma/client';
import { VitalType } from '../utils/constants';

const vitalTypes = Object.values(VitalType);

interface IAddOrEditVitalProps {
  vital?: Vital;
}

const AddOrEditVital: React.FC<IAddOrEditVitalProps> = ({ vital }) => {
  const isNewVital = !vital;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values): Promise<void> {
    const { name } = values;
    const value = parseFloat(values.value);
    const timestamp = new Date(values.timestamp);

    let params = {
      name,
      value,
      timestamp
    };
    if (!isNewVital) {
      params = { ...params, id: vital.id } as any;
    }

    const path = isNewVital ? ADD_VITAL_API_PATH : EDIT_VITAL_API_PATH;
    await axios.post(path, params);
    onClose();
    router.push(VITALS_PATH);
  }

  const newVitalTrigger = (
    <Button colorScheme="pink" onClick={onOpen}>
      <Flex gap={2} align="center">
        <AddIcon />
        <span>Vital</span>
      </Flex>
    </Button>
  );
  const existingVitalTrigger = (
    <MenuItem onClick={onOpen} icon={<EditIcon />}>
      Edit
    </MenuItem>
  );
  const trigger = isNewVital ? newVitalTrigger : existingVitalTrigger;
  const actionVerb = isNewVital ? 'Add' : 'Edit';

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
              {actionVerb} Vital
            </DrawerHeader>

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
                      defaultValue={vital?.name}
                      {...register('name', {
                        required: 'Name is required'
                      })}
                    >
                      {vitalTypes.map(type => {
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
                      defaultValue={getDatetimeDefaultValue(vital?.timestamp)}
                      type="datetime-local"
                      min="2022-06-01T00:00"
                      {...register('timestamp', {
                        required: 'Timestamp is required'
                      })}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="value">Value</FormLabel>
                    <Input
                      id="value"
                      defaultValue={vital?.value}
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
                {actionVerb}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default AddOrEditVital;
