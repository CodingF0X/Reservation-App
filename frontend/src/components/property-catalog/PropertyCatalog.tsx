import React from "react";
import useCreateProperty from "../../hooks/useCreateProperty";
import type { PropertyFormValues } from "./PropertyForm";
import PropertyForm from "./PropertyForm";


const PropertyCatalog: React.FC = () => {
  const { listProperty } = useCreateProperty();

  const handleCreate = async (values: PropertyFormValues) => {
    await listProperty(values);

  };

  return <PropertyForm onSubmit={handleCreate} submitLabel="Create Property" />;
};

export default PropertyCatalog;
