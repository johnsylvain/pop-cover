import React from 'react';
import styled from 'styled-components';

import { useCoverArt } from '../context/cover-art';
import { useAuth } from '../context/auth';
import { useSnackbar } from '../context/snackbar';

import { downloadImage } from '../util/image';

import { playlistService } from '../services/playlist';

import { Input } from './Input';
import { Button } from './Button';
import { FileDrop } from './FileDrop';
import { GradientPicker } from './GradientPicker';

const StyledControls = styled.div`
  border-radius: 5px;
  background: white;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
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
  const { setSnackbar } = useSnackbar();

  const createPlaylist = () => {
    playlistService
      .create({ token, name, image: renderer.export() })
      .then(response => {
        setSnackbar({ message: 'Playlist created.' });
      })
      .catch(error => {
        setSnackbar({ message: 'Oops. Please try again in a moment.' });
      });
  };

  const setName = name => {
    dispatch({
      type: 'SET_NAME',
      payload: name
    });
  };

  const setFile = file => {
    const url = window.URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      dispatch({
        type: 'SET_IMAGE',
        payload: image
      });
    });
  };

  return (
    <StyledControls>
      <Input
        type="text"
        placeholder="Playlist name"
        onChange={event => setName(event.target.value)}
        value={name}
      />

      <FileDrop
        onChange={setFile}
        accept="image/png"
        onError={() => {
          setSnackbar({ message: 'Please upload a PNG' });
        }}
      />

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
