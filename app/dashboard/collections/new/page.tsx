import CollectionForm from "@/components/collections/collectionForm";
import React from "react";

const CreateCollection = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <CollectionForm />
      </div>
    </div>
  );
};

export default CreateCollection;
