import { Typography } from "@mui/material";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";


const Login = () => {
  const { login, err } = useLogin();
  return (
    <div>
      <Auth
        submitLable="Login"
        onSubmit={(req) => login(req)}
        error={err}
      >
        <Typography>
          Don't have an account?{" "}
          <Typography
            component={Link}
            to="/signup"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Click here to Sign Up
          </Typography>
        </Typography>
        <Typography>{err}</Typography>
      </Auth>
    </div>
  );
};

export default Login;
