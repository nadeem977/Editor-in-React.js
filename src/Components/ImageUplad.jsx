import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AppContext } from "../context/EditorContext";
import { fabric } from "fabric";

const ImageUplad = () => {


  const { setImgget, setimagespass } = useContext(AppContext);

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgDataUrl = event.target.result;
        const id = Date.now();
        setImgget((prevImgUrls) => [...prevImgUrls, { id, imgDataUrl }]);
        const img = new Image();
        img.src = imgDataUrl;
        img.onload = () => {
          const fabricImg = new fabric.Image(img, {
            left: 0,
            top: 0,
            selectable: true,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false,
            id,
          });
          applyDefaultStyles(fabricImg);
          setimagespass((prevImages) => [...prevImages, fabricImg]);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const applyDefaultStyles = (image) => {
    image.transparentCorners = false;
    image.cornerColor = "#1976d2";
    image.cornerStyle = "circle";
  };

  return (
    <>
      <Button variant="contained">
        <label htmlFor="imageInput">Upload Image</label>
      </Button>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        style={{ display: "none" }}
        onChange={onImageUpload}
      />
    </>
  );
};

export default ImageUplad;
