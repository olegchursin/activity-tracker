import NextLink from 'next/link';
import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { Card } from './card';
import {
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  InfoOutlineIcon
} from '@chakra-ui/icons';

interface IActivity {
  readonly distance?: number;
  readonly duration?: string;
  readonly id: string;
  readonly name?: string;
  readonly reps?: number;
  readonly timestamp: string;
  readonly type: string;
}

interface IActivityCardProps {
  readonly activity: IActivity;
}

const ActivityCard: React.FunctionComponent<IActivityCardProps> = ({
  activity
}) => {
  const bg = useColorModeValue('white', 'gray.800');
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
              <MenuItem icon={<EditIcon />}>Edit</MenuItem>
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
