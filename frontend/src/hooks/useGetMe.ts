// src/hooks/useGetMe.ts
import { useState, useEffect } from "react";
import { API_URL } from "../constants/urls";

interface MeResponse {
  _id: string;
  email: string;
  imageURL?: string;
}

interface UseGetMeResult {
  data: MeResponse | null;
  loading: boolean;
  error: string | null;
}

const useGetMe = (): UseGetMeResult => {
  const [data, setData] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) {
            setData(null);
            return;
          }
          throw new Error(`Unexpected response: ${res.status}`);
        }

        const json = (await res.json()) as MeResponse;
        setData(json);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return { data, loading, error };
};

export { useGetMe };
