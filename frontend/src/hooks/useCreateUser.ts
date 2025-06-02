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

  return { register, err };
};

export default useCreateUser;
