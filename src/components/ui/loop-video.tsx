import React, { useEffect, useRef } from "react";

export default function LoopVideo({ src, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    // try to play programmatically (some browsers require user interaction otherwise)
    const vid = ref.current;
    if (vid) {
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay failed (rare because muted is set). We ignore or handle fallback.
        });
      }
    }
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  );
}
