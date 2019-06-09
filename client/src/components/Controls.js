import React, { useRef } from 'react';

import { useCoverArt } from '../context/cover-art';

import { Upload, Refresh } from './Icon';

export const Controls = () => {
  const imageInputRef = useRef();
  const [{ coverArt }] = useCoverArt();

  const createImage = () => {
    const url = window.URL.createObjectURL(imageInputRef.current.files[0])
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => {
      coverArt.setArtistImage(image)
    });
  }

  const downloadImage = (data, filename = 'untitled.jpeg') => {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="controls">
      <div className="inputs">
        <input type="text" className="input" placeholder="Artist name" onChange={event => coverArt.setArtistName(event.target.value.trim())} />

        <input type="file" className="input" id="artist-image" accept=".png" ref={imageInputRef} onChange={createImage} />
        <label htmlFor="artist-image">
          <Upload />
          &nbsp;
          Artist image
        </label>

        <button className="input">
          <Refresh />
          &nbsp;
          Cycle colors
        </button>

        <button className="button" onClick={() => {
          downloadImage(
            coverArt.export(),
            `this-is-${coverArt.artistName.toLowerCase().replace(' ', '-')}.jpeg`
           );
        }}>Download JPEG</button>

        <button className="button button--primary">Create Playlist</button>
      </div>
    </div>
  )
}
