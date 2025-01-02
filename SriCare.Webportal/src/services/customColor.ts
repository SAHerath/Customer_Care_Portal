import { createTheme, alpha, getContrastRatio} from '@mui/material/styles';

// Augment the palette to include a gold color
declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary'];
  }

  interface PaletteOptions {
    gold?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gold: true;
  }
}

const goldBase = '#9D6D38';

export const theme = createTheme({
  palette: {
    gold: {
      main: goldBase,
      light: alpha(goldBase, 0.5),
      dark: alpha(goldBase, 0.9),
      contrastText: getContrastRatio(goldBase, '#fff') > 4 ? '#fff' : '#111',
    },
  },
});