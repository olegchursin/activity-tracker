import NextLink from 'next/link';
import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
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

interface IVital {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly timestamp: string;
}

interface IVitalsCardProps {
  readonly vital: IVital;
}

const VitalsCard: React.FunctionComponent<IVitalsCardProps> = ({ vital }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const { id, name, value } = vital;
  const timestamp = new Date(vital.timestamp).toLocaleString();

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
              <NextLink href={`/vitals/${id}`} passHref>
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
        <Stat>
          <StatLabel>Value</StatLabel>
          <StatNumber>{value}</StatNumber>
          <StatHelpText>kg</StatHelpText>
        </Stat>
      </Box>
    </Card>
  );
};

export default VitalsCard;
