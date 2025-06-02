import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./components/Routes";
import Guard from "./components/auth/Guard";
//import Header from "./components/header/Header";
import usePath from "./hooks/usePaths";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  const { path } = usePath();
  const pathsVar = path === "/" || path.includes("home");

  const Routes = () => {
    return <RouterProvider router={routes} />;
  };
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* <Header /> */}
        <Guard>
          <Container sx={{ height: "80vh", maxWidth: "xl", mt:'30px' }}>
            {pathsVar ? (
              <Grid container spacing={5}>
                {/* <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 3 }}>
                </Grid> */}

                <Grid size={{ xs: 12, sm: 12, md: 7, lg: 8, xl: 9 }}>
                  <Routes />
                </Grid>
              </Grid>
            ) : (
              <Routes />
            )}
          </Container>
        </Guard>
      </ThemeProvider>
  );
}

export default App;
