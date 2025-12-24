import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const selected: CollectionType[] = value
    .map((id) => collections.find((collection) => collection._id === id))
    .filter((collection): collection is CollectionType => {
      return (
        collection !== undefined &&
        collection !== null &&
        collection.title !== undefined &&
        collection.title !== null
      );
    });

  const selectables = collections.filter(
    (collection) =>
      collection &&
      collection._id &&
      collection.title &&
      !value.includes(collection._id)
  );
  return (
    <Command className="overflow-visible bg-white">
      <div className="gap-1 border rounded-md">
        {selected.map((collection) => (
          <Badge className="bg-white text-black" key={collection._id}>
            {collection.title}
            <button
              className="ml-1 pt-2 pb-2"
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="mt-2 relative">
        {open && (
          <CommandGroup className="absolute w-full z-[9999] top-0 overflow-auto border rounded-md shadow-md bg-white max-h-60">
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
