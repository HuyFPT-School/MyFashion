import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                className="bg-red-500 text-white h-8 w-8 p-0"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ml_default" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button className="bg-gray-500 text-white" onClick={() => open()}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
