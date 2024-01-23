"use client";
import { Button } from "@/fsd/shared/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface ImgUploaderProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  handler: (value: string) => void;
  value: string[];
}

export const ImgUploader: FC<ImgUploaderProps> = (props) => {
  const { handler, value, disabled } = props;
  const onUpload = (res: any) => {
    if (res.event === "success") {
      handler(res.info.url);
    }
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handler("")}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={() => open()}
              className="flex gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
