import Auth from "./Auth";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { extractErrorMessage } from "../../utils/errors";
import useLogin from "../../hooks/useLogin";
import useCreateUser from "../../hooks/useCreateUser";

const Signup = () => {
  const { register } = useCreateUser();
  const [err, setErr] = useState("");
  const { login } = useLogin();
  const handleSubmit = async (credentials: {
    email: string;
    password: string;
    role?: string;
  }) => {
    const { email, password, role } = credentials;

    try {
      if (!role) {
        setErr("Role is required");
        return;
      }

      await register({ email, password, role });
      await login({ email, password });
      setErr("");
    } catch (error) {
      setErr(error instanceof Error ? error.message : String(error));
    }
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
      </Auth>
    </div>
  );
};

export default Signup;
