import AddOrEditMeal from './addOrEditMeal';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { DeleteIcon, HamburgerIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../utils/api';
import { getLocaleTimestamp } from '../utils/datetime';
import { Meal } from '@prisma/client';
import { MEAL_PATH } from '../utils/routing';
import { RecordType } from '../utils/constants';
import { useRouter } from 'next/router';

interface IMealCardProps {
  readonly meal: Meal;
}

const MealCard: React.FunctionComponent<IMealCardProps> = ({ meal }) => {
  const bg = useColorModeValue('white', 'gray.900');
  const { id, name, description } = meal;
  const mealDetailsPath = `${MEAL_PATH}/${id}`;
  const router = useRouter();

  return (
    <LinkBox as="article" maxW="sm" p="4" rounded="md" bg={bg}>
      <Flex direction="column" gap="6">
        <Flex justify="space-between">
          <Box>
            <Text fontWeight="bold" textTransform="capitalize">
              <NextLink href={mealDetailsPath} passHref>
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            </Text>
            <Text fontSize="sm">{getLocaleTimestamp(meal.timestamp)}</Text>
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
                <NextLink href={mealDetailsPath} passHref>
                  <Link>
                    <MenuItem icon={<InfoOutlineIcon />}>Details</MenuItem>
                  </Link>
                </NextLink>
                <AddOrEditMeal meal={meal} />
                <MenuItem
                  onClick={() => deleteRecord(id, RecordType.MEAL, router)}
                  icon={<DeleteIcon />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Box>
          <Text>{description}</Text>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default MealCard;
