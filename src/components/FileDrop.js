import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Upload } from './Icon';
import { Input } from './Input';

export const FileDrop = ({ onChange }) => {
  const [file, setFile] = useState();
  const onDrop = useCallback(([file]) => {
    onChange(file);
    setFile(file);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Input
        {...getInputProps()}
        type="file"
        id="artist-image"
        accept=".png"
        active={isDragActive}
      />
      <label htmlFor="artist-image">
        {file ? (
          <span>{file ? file.name : '1 image'} added.</span>
        ) : (
          <React.Fragment>
            <Upload />
            &nbsp; Drag and drop a PNG
          </React.Fragment>
        )}
      </label>
    </div>
  );
};
