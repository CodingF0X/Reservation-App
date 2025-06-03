import { Typography } from "@mui/material";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Routes from "../Routes";

const Login = () => {
  const { login, err } = useLogin();

  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    const success = await login(credentials);
    console.log(success)
    if (success) {
      Routes.navigate("/",{replace:true});
    }
  };
  return (
    <div>
      <Auth submitLable="Login" onSubmit={handleSubmit} error={err}>
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
