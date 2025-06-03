import { useState } from "react";
import { API_URL } from "../constants/urls";


const useLogout = () => {
  const [err, setErr] = useState<string>();

  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
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

  return { logout, err };
};

export default useLogout;
