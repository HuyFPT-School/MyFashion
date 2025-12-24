"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

const ImageUploads: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4">
      {value ? (
        <div className="relative w-[200px] h-[200px]">
          <div className="absolute top-0 right-0 z-10">
            <Button
              type="button"
              onClick={onRemove}
              className="bg-red-500 text-white h-8 w-8 p-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image
            src={value}
            alt="collection"
            fill
            sizes="200px"
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <CldUploadWidget uploadPreset="ml_default" onSuccess={onUpload}>
          {({ open }) => {
            return (
              <Button
                type="button"
                className="bg-gray-500 text-white"
                onClick={() => open()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUploads;
