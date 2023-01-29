import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box sx={{ height: '100vh' }}>{children}</Box>
      </Container>
    </>
  );
}
