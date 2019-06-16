import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CoverArtRenderer } from '../canvas/CoverArtRenderer';

import { useCoverArt } from '../context/cover-art';

const Canvas = styled.canvas`
  width: 100%;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const CoverArt = () => {
  const canvasRef = useRef(null);
  const [renderer, setRenderer] = useState();
  const [{ name, image, backdrop, isOverlay }, dispatch] = useCoverArt();
  const dimensions = 500;

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new CoverArtRenderer(canvasRef.current);
      dispatch({
        type: 'SET_RENDERER',
        payload: renderer
      });
      setRenderer(renderer);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (renderer) {
      renderer.update({ name });
    }
  }, [name, renderer]);

  useEffect(() => {
    if (renderer) {
      renderer.update({ backdrop });
    }
  }, [backdrop, renderer]);

  useEffect(() => {
    if (renderer) {
      renderer.update({ image });
    }
  }, [image, renderer]);

  useEffect(() => {
    if (renderer) {
      renderer.update({ isOverlay });
    }
  }, [isOverlay, renderer]);

  return (
    <Canvas ref={canvasRef} width={dimensions} height={dimensions}></Canvas>
  );
};
