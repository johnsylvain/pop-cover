import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CoverArt } from '../canvas/CoverArt';

import { useCoverArt } from '../context/cover-art';

const Canvas = styled.canvas`
  width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

export const Art = ({ name, image }) => {
  const canvasRef = useRef(null);
  const [{ coverArt }, dispatch] = useCoverArt();

  useEffect(() => {
    if (canvasRef.current) {
      dispatch({
        type: 'SET_COVER_ART',
        payload: new CoverArt(canvasRef.current)
      })
    }
  }, [canvasRef]);

  useEffect(() => {
    if (coverArt) {
      coverArt.setArtistName(name);
    }
  }, [name, coverArt]);

  useEffect(() => {
    if (coverArt) {
      coverArt.setArtistImage(image);
    }
  }, [image, coverArt])

  return (
    <Canvas ref={canvasRef} width={1000} height={1000}></Canvas>
  )
}

