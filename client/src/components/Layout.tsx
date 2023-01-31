import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';

interface LayoutProps {
  children: JSX.Element;
}

const theme = createTheme();

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position='absolute'
        color='default'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Finance App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth='md'>
        <Box display='flex' flexDirection='column' flex={1}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
