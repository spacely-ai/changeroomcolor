import styled from "@emotion/styled";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const uploaderOptions: UploadWidgetConfig = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["image/*"],
  maxFileSizeBytes: 5 * 2048 * 2048,
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#000000",
      active: "#3f3f3f",
    },
    fontSizes: {
      base: 12,
    },
  },
  locale: {
    uploadImage: "Upload",
    orDragDropImage: "JPG, PNG, formats",
    cancel: "Cancel",
  },
};

export const UploadDropZoneStyleWrap = styled(UploadDropzone)<{
  width?: string;
}>`
  .upload-widget__root {
    max-width: ${(props) => props.width ?? "226px"};
    @media screen and (min-width: 1440px) {
      width: 100%;
    }
    input[type="file" i]::-webkit-file-upload-button {
      cursor: pointer;
    }
  }
  .upload-widget__widget-base {
    left: 0;
    right: 0;
  }
  .upload-widget__widget-base--draggable {
    border: 1px dashed #e8eaed;
    border-radius: 8px;
  }
  .text-secondary {
    text-align: center;
    line-height: 140%;
  }
`;

interface ImageUploaderProps {
  value: string;
  setValue: (value: string) => void;
}

export default function ImageUploader({ value, setValue }: ImageUploaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col gap-1">
        {value && (
          <div className="relative w-[500px] h-[300px] flex justify-center items-center mt-2 rounded-lg">
            <Image
              src={value}
              alt="uploaded image"
              fill
              style={{
                objectFit: "cover",
              }}
              className="rounded-lg"
            />
            <Button
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setValue("")}
            >
              <X />
            </Button>
          </div>
        )}
        {!value && (
          <UploadDropZoneStyleWrap
            options={uploaderOptions}
            width="300px"
            height="150px"
            onUpdate={({ uploadedFiles }) => {
              if (uploadedFiles.length !== 0) {
                setValue(uploadedFiles[0].fileUrl);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
