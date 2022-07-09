import AddOrEditMeal from './addOrEditMeal';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Card } from './card';
import { DeleteIcon, HamburgerIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Meal } from '@prisma/client';

interface IMealCardProps {
  readonly meal: Meal;
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
              <AddOrEditMeal meal={meal} />
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
