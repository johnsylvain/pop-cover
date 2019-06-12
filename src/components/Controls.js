import React from 'react';
import styled from 'styled-components';

import { useCoverArt } from '../context/cover-art';

import { Input } from './Input';
import { Button } from './Button';
import { FileDrop } from './FileDrop';
import { GradientPicker } from './GradientPicker';

const StyledControls = styled.div`
  border-radius: 3px;
  background: white;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .controls-body {
    padding: 20px;
    flex: 1;
  }

  > .controls-footer {
    padding: 20px;
    padding-top: 0;
    display: flex;
    flex-wrap: wrap;

    & > * {
      width: 50%;
    }
  }
`;

export const Controls = () => {
  const [{ name, renderer }, dispatch] = useCoverArt();

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
      <div className="controls-body">
        <Input
          type="text"
          placeholder="Playlist name"
          onChange={event => setName(event.target.value)}
          value={name}
        />

        <FileDrop
          onChange={file => {
            if (file.type === 'image/png') {
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
          }}
        />

        <GradientPicker></GradientPicker>
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
