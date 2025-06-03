import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import Routes from "../Routes";

interface AuthProps {
  submitLable: string;
  onSubmit: (credentials: {
    email: string;
    password: string;
    role?: string;
  }) => Promise<void>;
  children: React.ReactNode; // to pass children to the Auth component
  error?: string;
}
const Auth = ({ submitLable, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { data } = useGetMe();

  // here to navigate to home page after successful login
  useEffect(() => {
    if (data?.status === "alive") Routes.navigate("/", { replace: true });
  }, [data?.status]);

  const emailError = () => {
    if (!error) return undefined;
    const lowerErr = error.toLowerCase();
    if (lowerErr.includes("email")) return error;
  };

  const passwordError = () => {
    if (!error) return undefined;
    if (error.includes("password")) return error;
  };
  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        maxWidth: {
          xs: "90%",
          sm: "70%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        },
        margin: "0 auto",
        padding: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: 5,
          xl: 6,
        },
        borderRadius: 1,
      }}
    >
      <TextField
        type="email"
        label="email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
        error={!!emailError()}
        helperText={emailError()}
      />
      <TextField
        type="password"
        label="password"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
        error={!!passwordError()}
        helperText={passwordError()}
      />

      <TextField
        type="text"
        label="role"
        variant="outlined"
        onChange={(event) => setRole(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        onClick={() =>
          onSubmit(role ? { email, password, role } : { email, password })
        }
      >
        {submitLable}
      </Button>

      {children}
    </Stack>
  );
};

export default Auth;
