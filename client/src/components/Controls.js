import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import { useCoverArt } from '../context/cover-art';

import { Upload, Check } from './Icon';

const StyledControls = styled.div`
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.05);
  background: white;

  > .title {
    background: rgba(135, 135, 135, 0.5);
    color: white;
    padding: 10px 20px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

const Gradient = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(180deg, ${props => props.gradient[0]} 0%, ${props => props.gradient[1]} 100%);
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

export const Controls = () => {
  const imageInputRef = useRef();
  const labelRef = useRef();
  const onDrop = useCallback(([file]) => {
    if (file.type === 'image/png') {
      const url = window.URL.createObjectURL(file)
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
  const [{ backdrops, backdrop, image }, dispatch] = useCoverArt();

  const setBackdrop = (gradient) => {
    dispatch({
      type: 'SET_BACKDROP',
      payload: gradient
    });
  }

  const setName = (name) => {
    dispatch({
      type: 'SET_NAME',
      payload: name
    });
  }

  const downloadImage = (data, filename) => {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    a.click();
  }

  return (
    <StyledControls>
      <div className="title">options</div>

      <div className="inputs">
        <input type="text" className="input" placeholder="Artist name" onChange={event => setName(event.target.value.trim())} />
        <div {...getRootProps()}>
          <input {...getInputProps()} className="input" id="artist-image" accept=".png"/>
          <label htmlFor="artist-image" ref={labelRef}>
            {isDragActive
              ? <span>Drop!</span>
              : image
                ? <span>1 image added</span>
                : <>
                    <Upload />
                    &nbsp;
                    Upload an image 
                  </>
            }
          </label>
        </div>

        <Gradients>
          {backdrops.map(gradient => (
            <Gradient
              key={gradient}
              gradient={gradient}
              onClick={() => setBackdrop(gradient)}
            >{gradient === backdrop && <Check />}</Gradient>
          ))}
        </Gradients>
      </div>
    </StyledControls>
  )
}


  // <button className="button" onClick={() => {
  //   downloadImage(
  //     coverArt.export(),
  //     `this-is-${coverArt.artistName.toLowerCase().replace(' ', '-')}.jpeg`
  //          );
  //       }}>Download JPEG</button>

  //       <button className="button button--primary">Create Playlist</button>
