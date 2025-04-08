import React, { useEffect, useState } from "react";
import classes from "./package-details-image-grid.module.less";
import Image from "next/image";

const PackageDetailsImageGrid = ({ images, openModal }) => {
  const [imagesToDisplay, setImagesToDisplay] = useState([]);

  useEffect(() => {
    if (images?.length) {
      setImagesToDisplay(images);
    }
  }, [images]);

  return (
    <div className={classes.gallery_grid}>
      {imagesToDisplay?.map((image, index) => (
        <Image
          key={index}
          src={image?.src}
          alt={image?.alt}
          width={640}
          height={640}
          quality={100}
        />
      ))}

      <div className={classes.overlay} onClick={openModal}>
        <span className="font10">View All Images</span>
      </div>
    </div>
  );
};

export default PackageDetailsImageGrid;
