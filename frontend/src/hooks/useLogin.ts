import { useState } from "react";
import { API_URL } from "../constants/urls";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [err, setErr] = useState<string>();

  const login = async (request: LoginRequest): Promise<boolean> => {
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
        const errBody = await res.json();
        throw new Error(
          res.status === 401
            ? "Invalid credentials"
            : errBody.message.join(" & ") || `HTTP error ${res.status}`
        );
      }

      setErr("");
      return true;
    } catch (error) {
      console.log(error);
      setErr(error instanceof Error ? error.message : String(error));
      return false;
    }
  };

  return { login, err };
};

export default useLogin;
