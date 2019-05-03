const theme = {
  direction: 'ltr',
  breakpoints: {
    keys: [
      'xs',
      'sm',
      'md',
      'lg',
      'xl'
    ],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920
    }
  },
  palette: {
    grey: {
      light: '#fafafa',
      50: '#c9c8c8',
      100: '#747474',
      200: '#f2fcef',
      300: '#4d4d4d'
    },
    common: {
      white: '#ffffff',
      black: '#666666',
    },
    primary: {
      main: '#0077ad',
      light: '#f5f5f5',
      50: '#e1f5fb',
      100: '#b3e5f5',
      200: '#83d3ee',
      300: '#55c2e8',
      400: '#34b5e5',
      500: '#15a8e2',
      600: '#0c9bd4',
      700: '#0088c1',
      800: '#0077ad',
      900: '#00588c',
    },
    secondary: {
      main: '#5FA544',
      light: '#A8DA8A',
      50: '#F0F9EB',
      100: '#D9EFCC',
      200: '#C0E5AB',
      300: '#A8DA8A',
      400: '#94D270',
      500: '#81CA57',
      600: '#73B94E',
      700: '#5FA544',
      800: '#4D913A',
      900: '#2B6E29',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    status: {
      inProgress: 'rgb(102,213,111, 0.29)',
      cancelled: 'rgb(245,88,102, 0.29)',
      passed: 'rgb(255,143,67, 0.29)',
      missed: 'rgb(255,201,30, 0.29)',
      quoted: 'rgb(89,213,179, 0.29)',
      lost: 'rgb(198,198,198, 0.29)',
      won: 'rgb(38,147,0, 0.29)',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Open Sans',
    fontSize: 13.57,
    fontWeightRegular: 400,
    h1: {
      fontSize: '5.817em',
      letterSpacing: '-0.094em',
      color: 'rgba(0,0,0,0.87)'
    },
    h2: {
      fontSize: '3.636em',
      letterSpacing: '-0.031em',
      color: 'rgba(0,0,0,0.87)'
    },
    h3: {
      fontSize: '2.909em',
      letterSpacing: 0,
      color: 'rgba(0,0,0,0.87)'
    },
    h4: {
      fontSize: '2.060em',
      letterSpacing: '0.016em',
      color: 'rgba(0,0,0,0.87)'
    },
    h5: {
      fontSize: '1.454em',
      letterSpacing: '0em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    h6: {
      fontSize: '1.212em',
      letterSpacing: '0.016em',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    subtitle1: {
      fontSize: '0.969em',
      color: 'rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.009em'
    },
    body1: {
      fontSize: '0.848em',
      color: 'rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.016em'
    },
    body2: {
      fontSize: '0.969em',
      color: 'rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.031em'
    },
    caption: {
      fontSize: '0.727em',
      color: 'rgba(0, 0, 0, 0.6)',
      letterSpacing: '0.025em'
    },
    button: {
      fontSize: '0.848em',
      color: 'rgba(0, 0, 0, 0.87)',
      letterSpacing: '0.078em'
    }
  },
  zIndex: {
    mobileStepper: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
};

export default theme;