import { ChangeEventHandler, FC } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../input";

export const Dropzone: FC<{
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ multiple, onChange, ...rest }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    ...rest,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      {/* <Input {...getInputProps({ onChange })} /> */}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop some files here, or click to select files</p>
      )}
    </div>
  );
};
