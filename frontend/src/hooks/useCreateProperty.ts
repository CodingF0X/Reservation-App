import { useState } from "react";
import { API_URL } from "../constants/urls";
import type { PropertyFormValues } from "../components/property-catalog/PropertyForm";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CreatePropertyInput extends PropertyFormValues {}

export interface UseCreateProperty {
  err: string | undefined;
  listProperty: (data: CreatePropertyInput) => Promise<void>;
}

const useCreateProperty = (): UseCreateProperty => {
  const [err, setErr] = useState<string>();

  const listProperty = async (request: CreatePropertyInput) => {
    try {
      const res = await fetch(`${API_URL}/properties`, {
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
    } catch (error) {
      console.log(error);
      setErr(error instanceof Error ? error.message : String(error));
    }
  };

  return { listProperty, err };
};

export default useCreateProperty;
