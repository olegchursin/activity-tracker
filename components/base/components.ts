export const component = {
  card: {
    baseStyle: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    },
    variants: {
      rounded: {
        padding: 6,
        borderRadius: 'xl',
        boxShadow: 'lg'
      },
      smooth: {
        padding: 4,
        borderRadius: 'base',
        boxShadow: 'md'
      }
    },
    defaultProps: {
      variant: 'rounded'
    }
  }
};
