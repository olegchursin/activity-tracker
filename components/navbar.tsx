import NextLink from 'next/link';
import ThemeToggle from './themeToggle';
import { ACTIVITIES_PATH, MEALS_PATH, VITALS_PATH } from '../utils/routing';
import { Box } from '@chakra-ui/layout';
import { Container, Flex, Image, Link, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';

interface ILink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

const links: ReadonlyArray<ILink> = [
  {
    id: 'activities',
    label: 'Activities',
    href: ACTIVITIES_PATH
  },
  {
    id: 'meals',
    label: 'Meals',
    href: MEALS_PATH
  },
  {
    id: 'vitals',
    label: 'Vitals',
    href: VITALS_PATH
  }
];

const Navbar = () => {
  const bg = useColorModeValue('white', 'black');

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      boxShadow="md"
      width="100%"
      overflow="hidden"
      bg={bg}
    >
      <Container maxW="1200px" pb="4" pt="4">
        <Flex align="center" justify="space-between">
          <NextLink href="/" passHref>
            <Box cursor="pointer">
              <Flex align="center" gap="4">
                <Image boxSize="50px" src="/img/tri.png" alt="Tri Icon" />
                <Text
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  bgClip="text"
                  fontSize="3xl"
                  fontWeight="extrabold"
                >
                  Tracker
                </Text>
              </Flex>
            </Box>
          </NextLink>

          <Flex align="center" gap="4">
            {links.map(link => {
              const { id, label, href } = link;
              return (
                <NextLink key={id} href={href} passHref>
                  <Link>{label}</Link>
                </NextLink>
              );
            })}

            <ThemeToggle />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
