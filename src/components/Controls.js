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

const Link = styled.a`
  color: white;
  font-weight: 700;
`;

export const Controls = () => {
  const [{ name, renderer }, dispatch] = useCoverArt();
  const [{ token, isAuthed }] = useAuth();
  const { setSnackbar } = useSnackbar();

  const createPlaylist = () => {
    const image = renderer.export(0.9).split(',')[1];
    playlistService
      .create({ token, name, image })
      .then(response => {
        setSnackbar({
          message: (
            <span>
              Playlist created.{' '}
              <Link href={response.external_urls.spotify} target="_blank">
                View here.
              </Link>
            </span>
          )
        });
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
    image.type = file.type;
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
        accept=".png,.jpg,.jpeg"
        onError={() => {
          setSnackbar({ message: 'Please upload a PNG or a JPEG' });
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
