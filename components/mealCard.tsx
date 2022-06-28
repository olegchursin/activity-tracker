import NextLink from 'next/link';
import {
  Box,
  Flex,
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

interface IMeal {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly timestamp: string;
}

interface IMealCardProps {
  readonly meal: IMeal;
}

const MealCard: React.FunctionComponent<IMealCardProps> = ({ meal }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const { id, name, description } = meal;
  const timestamp = new Date(meal.timestamp).toLocaleString();

  return (
    <Card variant="rounded" position="relative" bg={bg}>
      <Flex justify="space-between">
        <Box>
          <Text fontWeight="bold" textTransform="capitalize">
            {name}
          </Text>
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
              <NextLink href={`/meal/${id}`} passHref>
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

      <Box>
        <Text>{description}</Text>
      </Box>
    </Card>
  );
};

export default MealCard;
