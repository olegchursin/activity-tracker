import AddOrEditActivity from './addOrEditActivity';
import NextLink from 'next/link';
import { Activity } from '@prisma/client';
import { ACTIVITY_PATH } from '../utils/routing';
import {
  Box,
  Flex,
  IconButton,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { DeleteIcon, HamburgerIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../utils/api';
import { getLocaleTimestamp } from '../utils/datetime';
import { RecordType } from '../utils/constants';
import { useRouter } from 'next/router';

interface IActivityCardProps {
  readonly activity: Activity;
}

const ActivityCard: React.FunctionComponent<IActivityCardProps> = ({
  activity
}) => {
  const bg = useColorModeValue('white', 'gray.900');
  const { duration, id, name, type, distance, reps } = activity;
  const activityDetailsPath = `${ACTIVITY_PATH}/${id}`;
  const router = useRouter();

  return (
    <LinkBox as="article" maxW="sm" p="4" rounded="md" bg={bg}>
      <Flex direction="column" gap="6">
        <Flex justify="space-between">
          <Box>
            <Text fontWeight="bold" textTransform="capitalize">
              <NextLink href={activityDetailsPath} passHref>
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            </Text>
            <Tag size="sm" variant="outline" colorScheme="blue">
              <TagLabel>{type}</TagLabel>
            </Tag>
            <Text fontSize="sm">{getLocaleTimestamp(activity.timestamp)}</Text>
          </Box>

          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <NextLink href={activityDetailsPath} passHref>
                  <MenuItem icon={<InfoOutlineIcon />}>Details</MenuItem>
                </NextLink>
                <AddOrEditActivity activity={activity} />
                <MenuItem
                  onClick={() => deleteRecord(id, RecordType.ACTIVITY, router)}
                  icon={<DeleteIcon />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Flex gap="4">
          <Box>
            <Stat>
              <StatLabel>Duration</StatLabel>
              <StatNumber>{duration}</StatNumber>
              <StatHelpText>min</StatHelpText>
            </Stat>
          </Box>

          {distance ? (
            <Box>
              <Stat>
                <StatLabel>Distance</StatLabel>
                <StatNumber>{distance}</StatNumber>
                <StatHelpText>km</StatHelpText>
              </Stat>
            </Box>
          ) : null}

          {reps ? (
            <Box>
              <Stat>
                <StatLabel>Reps</StatLabel>
                <StatNumber>{reps}</StatNumber>
              </Stat>
            </Box>
          ) : null}
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default ActivityCard;
