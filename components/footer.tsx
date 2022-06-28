import {
  Box,
  Container,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Footer = () => {
  const bg = useColorModeValue('white', 'black');

  return (
    <Box as="footer" paddingY={6} bg={bg}>
      <Container maxW="1200px">
        <Text fontSize="sm">
          Built with{' '}
          <NextLink href="/">
            <Link>NextJS</Link>
          </NextLink>
          ,{' '}
          <NextLink href="/">
            <Link>Prisma</Link>
          </NextLink>
          ,{' '}
          <NextLink
            href="https://chakra-ui.com/"
            target="_blank"
            rel="noreferrer"
            passHref
          >
            <Link>ChakraUI</Link>
          </NextLink>{' '}
          and ♥️
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
