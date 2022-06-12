export const component = {
  card: {
    baseStyle: {
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      gap: 6
    },
    variants: {
      rounded: {
        padding: 8,
        borderRadius: 'xl',
        boxShadow: 'xl'
      },
      smooth: {
        padding: 6,
        borderRadius: 'base',
        boxShadow: 'md'
      }
    },
    defaultProps: {
      variant: 'smooth'
    }
  }
};
