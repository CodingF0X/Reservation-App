import { useState } from "react";
import { API_URL } from "../constants/urls";

interface registerRequest {
  email: string;
  password: string;
  role: string;
}

const useCreateUser = () => {
  const [err, setErr] = useState<string>();

  const register = async (request: registerRequest) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
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
            : errBody.message.join(' & ') || `HTTP error ${res.status}`
        );
      }

      setErr("");
    } catch (error) {
      console.log(error);
      setErr(error instanceof Error ? error.message : String(error));
    }
  };

  return { register, err, setErr };
};

export default useCreateUser;
