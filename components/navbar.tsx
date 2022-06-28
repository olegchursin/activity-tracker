import { Box } from '@chakra-ui/layout';
import { Container, Image, Link, Text, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';
import NextLink from 'next/link';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" boxShadow="md">
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
