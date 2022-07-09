import NextLink from 'next/link';
import { Activity } from '@prisma/client';
import {
  Box,
  Flex,
  IconButton,
  Link,
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
import { Card } from './card';
import { DeleteIcon, HamburgerIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import AddOrEditActivity from './addOrEditActivity';

interface IActivityCardProps {
  readonly activity: Activity;
}

const ActivityCard: React.FunctionComponent<IActivityCardProps> = ({
  activity
}) => {
  const bg = useColorModeValue('white', 'gray.900');
  const { duration, id, name, type, distance, reps } = activity;
  const timestamp = new Date(activity.timestamp).toLocaleString();

  return (
    <Card variant="rounded" position="relative" bg={bg}>
      <Flex justify="space-between">
        <Box>
          <Text fontWeight="bold" textTransform="capitalize">
            {name}
          </Text>
          <Tag size="sm" variant="outline" colorScheme="blue">
            <TagLabel>{type}</TagLabel>
          </Tag>
          <Text fontSize="sm">{timestamp}</Text>
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
              <NextLink href={`/activity/${id}`}>
                <Link>
                  <MenuItem icon={<InfoOutlineIcon />}>Details</MenuItem>
                </Link>
              </NextLink>
              <AddOrEditActivity activity={activity} />
              <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
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
    </Card>
  );
};

export default ActivityCard;
