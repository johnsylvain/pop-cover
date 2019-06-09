import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CoverArt } from '../canvas/CoverArt';

import { useCoverArt } from '../context/cover-art';

const Canvas = styled.canvas`
  width: 100%;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

export const Art = () => {
  const canvasRef = useRef(null);
  const [coverArt, setCoverArt] = useState();
  const [{ name, image, backdrop }, dispatch] = useCoverArt();
  const dimensions = 1000;

  useEffect(() => {
    if (canvasRef.current) {
      setCoverArt(new CoverArt(canvasRef.current));
    }
  }, [canvasRef]);

  useEffect(() => {
    if (coverArt) {
      coverArt.setArtistName(name);
    }
  }, [name, coverArt]);

  useEffect(() => {
    if (coverArt) {
      coverArt.setGradient(backdrop);
    }
  }, [backdrop, coverArt]);

  useEffect(() => {
    if (coverArt) {
      coverArt.setArtistImage(image);
    }
  }, [image, coverArt]);

  return (
    <Canvas ref={canvasRef} width={dimensions} height={dimensions}></Canvas>
  );
};
