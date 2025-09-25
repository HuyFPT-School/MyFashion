import CollectionForm from "@/components/collections/collectionForm";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const CreateCollection = () => {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <CollectionForm />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default CreateCollection;
