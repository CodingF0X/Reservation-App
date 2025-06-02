import { useState } from "react";
import { API_URL } from "../constants/urls";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [err, setErr] = useState<string>();

  const login = async (request: LoginRequest) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setErr("Invalid credentials");
        } else {
          setErr("Unknown error occurred");
        }
        return;
      }

      setErr("");
    } catch (error) {
      console.log(error);
      setErr("Unknown error");
    }
  };

  return { login, err };
};

export default useLogin;
