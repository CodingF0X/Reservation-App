import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar, Typography } from "@mui/material";
import Branding from "./Branding";
import Desktop_Nav from "./Desktop_Nav";
import Settings from "./Settings";
import Routes from "../Routes";
import { useGetMe } from "../../hooks/useGetMe";

const pages = [""];

const Header = () => {
  const { data } = useGetMe();
  return (
    <AppBar position="static" sx={{ color: "white", background: "skyblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <Desktop_Nav pages={pages} />
          {data?.status === "alive" ? (
            <Settings />
          ) : (
            <Typography component="a" onClick={() => Routes.navigate("/login")}>
              Login
            </Typography>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
