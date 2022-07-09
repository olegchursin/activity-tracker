import { IconButton } from '@chakra-ui/button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/color-mode';

const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
