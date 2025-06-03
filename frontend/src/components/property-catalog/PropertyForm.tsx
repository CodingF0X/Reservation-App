// src/components/PropertyForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

export interface Address {
  city: string;
  street: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AvailabilityEntry {
  isAvailable: boolean;
  start: string; // ISO date string, e.g. "2006-04-20"
  end: string;   // ISO date string, e.g. "2022-07-12"
}

export interface PropertyFormValues {
  name: string;
  address: Address;
  hostId: string;
  pricePerNight: string;
  currency: string;
  amenities: string[];       // array of amenity names
  availability: AvailabilityEntry[];
  maxGuests: number;
}

export interface PropertyFormProps {
  /** If provided, the form initializes with these values (for “edit” mode). */
  initialValues?: PropertyFormValues;
  /** Called when the user submits. Receives the complete `PropertyFormValues`. */
  onSubmit: (values: PropertyFormValues) => Promise<void> | void;
  /** Text to show on the submit button. Default: "Save Property" */
  submitLabel?: string;
}

const defaultValues: PropertyFormValues = {
  name: "",
  address: {
    city: "",
    street: "",
    state: "",
    postalCode: "",
    country: "",
  },
  hostId: "",
  pricePerNight: "",
  currency: "",
  amenities: [],
  availability: [
    {
      isAvailable: true,
      start: "",
      end: "",
    },
  ],
  maxGuests: 1,
};

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Property",
}) => {
  // Merge defaults with any initialValues passed in:
  const [formValues, setFormValues] = useState<PropertyFormValues>(
    initialValues ? { ...defaultValues, ...initialValues } : defaultValues
  );

  const [amenitiesInput, setAmenitiesInput] = useState<string>(
    formValues.amenities.join(", ")
  );

  const [submitting, setSubmitting] = useState(false);

  // Handle text‐fields and simple fields:
  const handleFieldChange =
    <K extends keyof PropertyFormValues>(
      field: K
    ) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => {
      const value =
        typeof e === "string"
          ? e
          : (e.target.value as PropertyFormValues[K]);

      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  // Special handler for address sub‐fields
  const handleAddressChange =
    <K extends keyof Address>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setFormValues((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    };

  // Availability handlers
  const handleAddAvailability = () => {
    setFormValues((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { isAvailable: true, start: "", end: "" },
      ],
    }));
  };

  const handleRemoveAvailability = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }));
  };

  const handleAvailabilityChange = (
    index: number,
    field: keyof AvailabilityEntry,
    value: string | boolean
  ) => {
    setFormValues((prev) => ({
      ...prev,
      availability: prev.availability.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      ),
    }));
  };

  // When user edits the comma‐separated amenities input:
  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenitiesInput(e.target.value);
    const arr = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setFormValues((prev) => ({
      ...prev,
      amenities: arr,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formValues);
      // Optionally, you could reset the form here if you want:
      // setFormValues(defaultValues);
      // setAmenitiesInput("");
    } catch (err) {
      console.error("Failed to submit property:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 2 }}>
      <Stack spacing={4}>
        {/* ====== General Details ====== */}
        <Typography variant="h5">Property Details</Typography>
        <TextField
          label="Name"
          value={formValues.name}
          onChange={handleFieldChange("name")}
          required
          fullWidth
        />

        <TextField
          label="Host ID"
          value={formValues.hostId}
          onChange={handleFieldChange("hostId")}
          required
          fullWidth
        />

        <Divider />

        {/* ====== Address ====== */}
        <Typography variant="h6">Address</Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Box flex={1}>
            <TextField
              label="City"
              value={formValues.address.city}
              onChange={handleAddressChange("city")}
              required
              fullWidth
            />
          </Box>

          <Box flex={1}>
            <TextField
              label="Street"
              value={formValues.address.street}
              onChange={handleAddressChange("street")}
              required
              fullWidth
            />
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Box flex={1}>
            <TextField
              label="State"
              value={formValues.address.state}
              onChange={handleAddressChange("state")}
              required
              fullWidth
            />
          </Box>

          <Box flex={1}>
            <TextField
              label="Postal Code"
              value={formValues.address.postalCode}
              onChange={handleAddressChange("postalCode")}
              required
              fullWidth
            />
          </Box>

          <Box flex={1}>
            <TextField
              label="Country"
              value={formValues.address.country}
              onChange={handleAddressChange("country")}
              required
              fullWidth
            />
          </Box>
        </Stack>

        <Divider />

        {/* ====== Pricing ====== */}
        <Typography variant="h6">Pricing</Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Box flex={1}>
            <TextField
              label="Price Per Night"
              value={formValues.pricePerNight}
              onChange={handleFieldChange("pricePerNight")}
              required
              fullWidth
            />
          </Box>
          <Box flex={1}>
            <TextField
              label="Currency"
              value={formValues.currency}
              onChange={handleFieldChange("currency")}
              required
              fullWidth
            />
          </Box>
        </Stack>

        <Divider />

        {/* ====== Amenities ====== */}
        <Typography variant="h6">Amenities</Typography>
        <TextField
          label="Amenities (comma‐separated)"
          value={amenitiesInput}
          onChange={handleAmenitiesChange}
          helperText="e.g. Wifi, Parking, Pool"
          fullWidth
        />

        <Divider />

        {/* ====== Availability ====== */}
        <Typography variant="h6">Availability</Typography>
        {formValues.availability.map((entry, idx) => (
          <Stack
            key={idx}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={entry.isAvailable}
                    onChange={(e) =>
                      handleAvailabilityChange(
                        idx,
                        "isAvailable",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Available"
              />
            </Box>

            <Box flex={1}>
              <TextField
                label="Start Date"
                type="date"
                value={entry.start}
                onChange={(e) =>
                  handleAvailabilityChange(idx, "start", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Box>

            <Box flex={1}>
              <TextField
                label="End Date"
                type="date"
                value={entry.end}
                onChange={(e) =>
                  handleAvailabilityChange(idx, "end", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
            </Box>

            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveAvailability(idx)}
              >
                Remove
              </Button>
            </Box>
          </Stack>
        ))}

        <Box>
          <Button variant="contained" onClick={handleAddAvailability}>
            Add Availability
          </Button>
        </Box>

        <Divider />

        <Typography variant="h6">Guests</Typography>
        <TextField
          label="Max Guests"
          type="number"
          value={formValues.maxGuests}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              maxGuests: Number(e.target.value),
            }))
          }
          InputProps={{ inputProps: { min: 1 } }}
          required
          fullWidth
        />

        <Divider />

        {/* ====== Submit ====== */}
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
          >
            {submitLabel}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default PropertyForm;
