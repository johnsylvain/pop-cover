import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { Input } from './Input';

const FileDropBase = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

export const FileDrop = ({ onChange, onError, accept }) => {
  const [file, setFile] = useState();
  const onDrop = useCallback(([file]) => {
    if (accept.includes(file.type.split('/')[1])) {
      onChange(file);
      setFile(file);
    } else {
      onError();
    }
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FileDropBase {...getRootProps()}>
      <Input
        {...getInputProps()}
        type="file"
        id="artist-image"
        accept={accept}
        active={isDragActive}
      />
      <label htmlFor="artist-image">
        {file ? (
          <span>{file ? file.name : '1 image'} added</span>
        ) : (
          <span>Drag and drop an image</span>
        )}
      </label>
    </FileDropBase>
  );
};
