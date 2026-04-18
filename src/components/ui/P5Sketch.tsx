'use client';

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5SketchProps {
  sketch: (p: p5) => void;
  className?: string;
}

const P5Sketch: React.FC<P5SketchProps> = ({ sketch, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: p5;

    if (containerRef.current) {
      p5Instance = new p5(sketch, containerRef.current);
    }

    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [sketch]);

  return <div ref={containerRef} className={className} />;
};

export default P5Sketch;
