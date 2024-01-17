import { FC } from "react";
import Dropzone, { Accept } from "react-dropzone";
import { Input } from "../input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import { UploadCloudIcon } from "lucide-react";

export const DropzoneInput: FC<{
  isMultiple?: boolean;
  extension: Accept;
  onDrop: (files: FileList) => void;
  fieldState: ControllerFieldState;
  onBlur: () => void;
  onChange: () => void;
}> = ({
  isMultiple,
  extension,
  onBlur,
  onChange,
  fieldState,
  onDrop,
  ...rest
}) => {
  return (
    <Dropzone
      noClick
      multiple={isMultiple}
      accept={extension}
      onDrop={(acceptedFiles) => {
        const files = acceptedFiles as unknown as FileList;
        onDrop(files);
      }}
    >
      {({ getRootProps, getInputProps, open, isDragActive, acceptedFiles }) => (
        <div>
          <div
            className={cn(
              "flex items-center justify-center border-2 border-dashed p-2 sm:p-6 lg:p-10",
              {
                "border-white": isDragActive,
              },
            )}
            // style={{
            //   borderStyle: "dashed",
            //   backgroundColor: isDragActive ? `#808080` : "transparent",
            // }}
            {...getRootProps()}
          >
            <div className="flex flex-col gap-2 items-center">
              <Input
                className="hidden"
                {...getInputProps({
                  id: "spreadsheet",
                  onChange,
                  onBlur,
                })}
              />
              <Button variant="secondary" onClick={open}>
                Browse
              </Button>
              <UploadCloudIcon className="w-24 h-24 text-border" />
              <p className="text-xl">Or drag and drop in this zone</p>

              {acceptedFiles.length > 0 && (
                <div className="text-sm">
                  <ul>
                    {acceptedFiles.slice(0, 3).map((item, idx) => (
                      <li
                        className="max-w-[280px] truncate ..."
                        key={item.name}
                      >
                        {item.name}
                      </li>
                    ))}
                    {acceptedFiles.length > 3 && <div>...</div>}
                  </ul>
                </div>
              )}
              <div>
                {fieldState.error && (
                  <span role="alert">{fieldState.error.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};
