import React, { useState, useEffect, useContext } from "react";
import { fabric } from 'fabric';

import { Box ,Button} from "@mui/material";
import "../App.css";
import Imagesdrag from "../Components/Imagesdrag";
import { AppContext } from "../context/EditorContext";
import ImageUplad from "../Components/ImageUplad";


const Home = () => {

  const {ImgeID ,imagespass,setimagespass} = useContext(AppContext);
  const [canvas, setCanvas] = useState(null)

 
  const handleCanvasRender = () => {
    if (imagespass.length > 0) {
      const newCanvas = new fabric.Canvas("canvas", {
        width: 600,
        height:600,
        top:50,
        left:50,
      
      });
      setCanvas(newCanvas);
      imagespass.forEach((image) => {
        newCanvas.add(image);
      });
      newCanvas.renderAll();
    }
  };
  
  useEffect(() => {
    if (canvas && imagespass.length > 0) {
      canvas.clear();
      imagespass.forEach((image) => {
        canvas.add(image);
      });
      canvas.renderAll();
    }
  }, [canvas, imagespass]);

  useEffect(() => {
    if(ImgeID){
      funcDelteimg(ImgeID);
    }
  },[ImgeID]);
  
  const funcDelteimg = (ImgeID) => {
    const result = imagespass.filter((item) => item.id !== ImgeID);  
    setimagespass(result);
    
    if (canvas) {
      canvas.forEachObject((obj) => {
        if (obj.id === ImgeID) {
          obj.setElement(null); 
        }
      });
      canvas.requestRenderAll();
    }
  };
  



  
  return (
    <Box>
      <div className="main-div">
        <Box className="Edit-main-div">
           <ImageUplad/>
          <Button variant="contained" onClick={handleCanvasRender}>
            Render Images on Canvas
          </Button>
        </Box>
        <Box>
          <canvas id="canvas" width={'500px'}></canvas>
        </Box>
        <Imagesdrag />
      </div>
    </Box>
  );
};

export default Home;
