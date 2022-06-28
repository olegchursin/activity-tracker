import NextLink from 'next/link';
import { Box } from '@chakra-ui/layout';
import { Container, Flex, Image, Link, Text } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
            <NextLink href="/activities" passHref>
              <Link>Activities</Link>
            </NextLink>
            <NextLink href="/meals" passHref>
              <Link>Meals</Link>
            </NextLink>
            <NextLink href="/vitals" passHref>
              <Link>Vitals</Link>
            </NextLink>
            <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
