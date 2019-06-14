import React from 'react';
import styled from 'styled-components';

import { useCoverArt } from '../context/cover-art';
import { useAuth } from '../context/auth';

import { downloadImage } from '../util/image';

import { playlistService } from '../services/playlist';

import { Input } from './Input';
import { Button } from './Button';
import { FileDrop } from './FileDrop';
import { GradientPicker } from './GradientPicker';

const StyledControls = styled.div`
  border-radius: 5px;
  background: white;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;

  > .controls-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding-top: 20px;

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const Controls = () => {
  const [{ name, renderer }, dispatch] = useCoverArt();
  const [{ token, isAuthed }] = useAuth();

  const createPlaylist = () => {
    playlistService
      .create({ name, image: renderer.export() }, token)
      .then(response => {
        console.log(response);
      });
  };

  const setName = name => {
    dispatch({
      type: 'SET_NAME',
      payload: name
    });
  };

  const setFile = file => {
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
  };

  return (
    <StyledControls>
      <Input
        type="text"
        placeholder="Playlist name"
        onChange={event => setName(event.target.value)}
        value={name}
      />

      <FileDrop onChange={setFile} />

      <GradientPicker />

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
        <Button primary onClick={createPlaylist} disabled={!isAuthed}>
          Create Playlist
        </Button>
      </div>
    </StyledControls>
  );
};
