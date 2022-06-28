import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { component } from './components/base/components';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true
};

const components = {
  Card: component.card
};

export const theme = extendTheme({ config, components });
