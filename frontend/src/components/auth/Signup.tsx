import Auth from "./Auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
// import { extractErrorMessage } from "../../utils/errors";
import useLogin from "../../hooks/useLogin";
import useCreateUser from "../../hooks/useCreateUser";
import Routes from "../Routes";

const Signup = () => {
  const { register, err, setErr } = useCreateUser();

  const { login } = useLogin();
  const handleSubmit = async (credentials: {
    email: string;
    password: string;
    role?: string;
  }) => {
    const { email, password, role } = credentials;

     if (!role) {
        setErr("Role is required");
        return;
      }

      await register({ email, password, role });
      await login({ email, password });
      Routes.navigate('/');
  };
  return (
    <div>
      <Auth submitLable="Signup" onSubmit={handleSubmit} error={err}>
        <Typography>
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/login"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Click here to login
          </Typography>
        </Typography>
        <Typography>{err}</Typography>
      </Auth>
    </div>
  );
};

export default Signup;
