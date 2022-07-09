import AddOrEditVital from './addOrEditVital';
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
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { DeleteIcon, HamburgerIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { deleteRecord } from '../utils/api';
import { getLocaleTimestamp } from '../utils/datetime';
import { RecordType } from '../utils/constants';
import { useRouter } from 'next/router';
import { Vital } from '@prisma/client';
import { VITAL_PATH } from '../utils/routing';

interface IVitalsCardProps {
  readonly vital: Vital;
}

const VitalsCard: React.FunctionComponent<IVitalsCardProps> = ({ vital }) => {
  const bg = useColorModeValue('white', 'gray.900');
  const { id, name, value } = vital;
  const vitalDetailsPath = `${VITAL_PATH}/${id}`;
  const router = useRouter();

  return (
    <LinkBox as="article" maxW="sm" p="4" rounded="md" bg={bg}>
      <Flex direction="column" gap="6">
        <Flex justify="space-between">
          <Box>
            <Text fontWeight="bold" textTransform="capitalize">
              <NextLink href={vitalDetailsPath} passHref>
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            </Text>
            <Text fontSize="sm">{getLocaleTimestamp(vital.timestamp)}</Text>
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
                <NextLink href={vitalDetailsPath} passHref>
                  <Link>
                    <MenuItem icon={<InfoOutlineIcon />}>Details</MenuItem>
                  </Link>
                </NextLink>
                <AddOrEditVital vital={vital} />
                <MenuItem
                  onClick={() => deleteRecord(id, RecordType.VITAL, router)}
                  icon={<DeleteIcon />}
                >
                  Delete
                </MenuItem>
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
      </Flex>
    </LinkBox>
  );
};

export default VitalsCard;
