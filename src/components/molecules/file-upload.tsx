import React from 'react';
import {Input} from "~/components/ui/input";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export type FileUploadProps = {
  value: string;
  onChange: (value: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = (props) => {

  const processFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;

      if (!content) {
        console.warn("File content is empty");
        return;
      }

      if (content instanceof ArrayBuffer) {
        console.error("Do not support multiple files");
        return;
      }

      props.onChange(content);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={"flex items-center"}>
      <Input type={"file"} onChange={processFile}/>
      {props.value &&
          <div
              autoFocus={false}
              className={"mx-0 px-2"}
              onClick={() => props.onChange("")}
          >
              <CloseIcon/>
          </div>
      }
    </div>
  );
}
