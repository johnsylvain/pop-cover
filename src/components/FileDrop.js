import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import { Input } from './Input';

const FileDropBase = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

export const FileDrop = ({ onChange }) => {
  const [file, setFile] = useState();
  const onDrop = useCallback(([file]) => {
    onChange(file);
    setFile(file);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FileDropBase {...getRootProps()}>
      <Input
        {...getInputProps()}
        type="file"
        id="artist-image"
        accept=".png"
        active={isDragActive}
      />
      <label htmlFor="artist-image">
        {file ? (
          <span>{file ? file.name : '1 image'} added</span>
        ) : (
          <span>Drag and drop a PNG</span>
        )}
      </label>
    </FileDropBase>
  );
};
