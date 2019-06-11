import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import { useCoverArt } from '../context/cover-art';

import { Upload, Check } from './Icon';
import { Input } from './Input';
import { Button } from './Button';

const StyledControls = styled.div`
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  background: white;
  overflow: hidden;

  > .controls-title {
    background: rgba(135, 135, 135, 0.8);
    color: white;
    padding: 10px 20px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  > .controls-body {
    padding: 20px;
  }

  > .controls-footer {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`;

const Gradient = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    180deg,
    ${props => props.gradient[0]} 0%,
    ${props => props.gradient[1]} 100%
  );
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const Gradients = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Img = styled.img`
  width: 100px;
  margin-bottom: 10px;
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Controls = () => {
  const imageInputRef = useRef();
  const labelRef = useRef();
  const [file, setFile] = useState();
  const onDrop = useCallback(([file]) => {
    if (file.type === 'image/png') {
      setFile(file);
      const url = window.URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        dispatch({
          type: 'SET_IMAGE',
          payload: image
        });
      });
    }
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [
    { backdrops, backdrop, image, name, renderer },
    dispatch
  ] = useCoverArt();

  const setBackdrop = gradient => {
    dispatch({
      type: 'SET_BACKDROP',
      payload: gradient
    });
  };

  const setName = name => {
    dispatch({
      type: 'SET_NAME',
      payload: name
    });
  };

  const downloadImage = (data, filename) => {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    a.click();
  };

  return (
    <StyledControls>
      <div className="controls-title">options</div>

      <div className="controls-body">
        <Input
          type="text"
          placeholder="Playlist name"
          onChange={event => setName(event.target.value)}
          value={name}
          autoFocus="on"
        />
        <div {...getRootProps()}>
          <Input
            {...getInputProps()}
            type="file"
            id="artist-image"
            accept=".png"
            active={isDragActive}
          />
          <label htmlFor="artist-image" ref={labelRef}>
            {image ? (
              <Preview>
                <Img src={image.src} alt="" />
                <span>{file ? file.name : '1 image'} added.</span>
              </Preview>
            ) : (
              <>
                <Upload />
                &nbsp; Drag and drop a PNG
              </>
            )}
          </label>
        </div>

        <Gradients>
          {backdrops.map(gradient => (
            <Gradient
              key={gradient}
              gradient={gradient}
              onClick={() => setBackdrop(gradient)}
            >
              {gradient === backdrop && <Check />}
            </Gradient>
          ))}
        </Gradients>
      </div>

      <div className="controls-footer">
        <Button
          onClick={() => {
            downloadImage(
              renderer.export(),
              `this-is-${(renderer.artistName || renderer.defaultName)
                .toLowerCase()
                .replace(' ', '-')}.jpeg`
            );
          }}
        >
          Download JPEG
        </Button>
        <Button primary>Create Playlist</Button>
      </div>
    </StyledControls>
  );
};
