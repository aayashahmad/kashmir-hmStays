import React, { useEffect, useState } from "react";

const ImageWithFallback = ({ src, alt, style, width, height }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setImageError(false);
  }, [src]);

  let fallback = "/images/smallnavbarlogo.png";

  const handleError = () => {
    setImgSrc(fallback);
    setImageError(true);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="eager"
      style={{ ...style, ...(imageError ? styles.greyImage : {}) }}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

const styles = {
  greyImage: {
    filter: "grayscale(100%)",
  },
};

export default ImageWithFallback;
