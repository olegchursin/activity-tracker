import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { component } from './components/base/components';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
};

const components = {
  Card: component.card
};

const styles = {
  global: props => ({
    body: {
      backgroundColor: props.colorMode === 'dark' ? 'gray.900' : 'gray.50'
    }
  })
};

export const theme = extendTheme({ config, components, styles });
