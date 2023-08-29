import React, { useState, useEffect, useContext } from "react";
import { fabric } from "fabric";
import { Box, Button } from "@mui/material";
import "../App.css";
import Imagesdrag from "../Components/Imagesdrag";
import { AppContext } from "../context/EditorContext";
import ImageUplad from "../Components/ImageUplad";
import ButtonsFunctionality from "../Components/ButtonsFunctionality";
import watermark from '../assets/watermark.png'
const Home = () => {


  const { ImgeID, imagespass, setimagespass, setcanvas }= useContext(AppContext);
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState("");
  const [Istext, setIstext] = useState([])



  useEffect(() => {
    const newCanvas = new fabric.Canvas("canvas", {
      width: 600,
      height: 800,
      top: 50,
      left: 50,
      selection: true,
      draggable: true,
    });
    setCanvas(newCanvas);
    setcanvas(newCanvas);
  }, []);


  const handleCanvasBackground = (e) => {
    const col = e.target.value;
    if (canvas) {
      canvas.setBackgroundColor(col, canvas.renderAll.bind(canvas));
    }
  };

  useEffect(() => {
    handleCanvasRender();
  }, [imagespass]);

  const handleCanvasRender = () => {
    if (canvas) {
      imagespass.forEach((image) => {
        image.selectable = true;
        image.setCoords();
        canvas.add(image);
      });
      canvas.requestRenderAll();
    }
  };

  const AddTexthandel = () => {
    const textBox = new fabric.Textbox(text, {
      left: 100,
      top: 100,
      width: 300,
      cornerStyle: "circle",
      cornerColor: "#1976d2",
      transparentCorners: false,
      selection: true,
      draggable: true,
    });

    if (textBox) {
      canvas.add(textBox);
      canvas.requestRenderAll();
      setText("");
      setIstext([...Istext,textBox]);
    }
  };
  const handleDelteSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      if (activeObject instanceof fabric.Text) {
        canvas.remove(activeObject);
        canvas.renderAll();
      } else {
        console.log('Selected object is an image.');
      }
    }
  };
  
  const handeltext = (e) => {
    let val = e.target.value;
    setText(val);
  };

  useEffect(() => {
    if (canvas && imagespass.length > 0) {
      imagespass.forEach((image) => {
        canvas.add(image);
      });
      canvas.requestRenderAll();
    }
  }, [canvas, imagespass]);

  useEffect(() => {
    if (ImgeID) {
      funcDelteimg(ImgeID);
    }
  }, [ImgeID]);

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
  const ClearCanvas = () => {
    canvas.remove(...canvas.getObjects());
  };


  
  const downloadCanvas = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const down = document.createElement("a");
      down.href = dataURL;
      down.download = "canvas_image.png";
      down.click();
    }
  };

  const downloadCanvasWatermark = () => {
    if (canvas) {
      const watermarkImage = new Image();
      watermarkImage.src = watermark;
  
      watermarkImage.onload = () => {
        const aspectRatio = watermarkImage.width / watermarkImage.height;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.width / aspectRatio;
  
        const fabricWatermarkImage = new fabric.Image(watermarkImage, {
          left: 0,
          top: 0,
          width: canvasWidth,
          height: canvasHeight,
          selectable: false,
          hasControls: false,
          hasBorders: false,
        });
  
        canvas.add(fabricWatermarkImage);
        canvas.renderAll();
  
        const dataURL = canvas.toDataURL('image/png');
        const down = document.createElement('a');
        down.href = dataURL;
        down.download = 'canvas_with_watermark.png';
        down.click();
  
        canvas.remove(fabricWatermarkImage);
        canvas.renderAll();
      };
    }
  };
  





  return (
    <div className="main-div">
      <div className="textBox">
        <div className="sidebars">
      <Button variant="contained" color="success" onClick={downloadCanvas}>Download</Button>
      <Button variant="contained" color="success" onClick={downloadCanvasWatermark}>Download watermark image</Button>
          <Box className="todiv">
            Canvas
            <input
              type="color"
              onChange={handleCanvasBackground}
              id="canvasPickerback"
            />
          </Box>
          <Button variant="contained" color="error" onClick={ClearCanvas}>
            clear Canvas
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelteSelected}>
            Delete selected text
          </Button>
          <ImageUplad />
          <textarea
            cols="30"
            rows="5"
            value={text}
            onChange={handeltext}
          ></textarea>
          <Button
            variant="contained"
            color="secondary"
            disabled={text.length > 0 ? false : true}
            onClick={AddTexthandel}
          >
           
            add text
          </Button>
          {Istext.length >= 1 && <ButtonsFunctionality />}
        </div>
      </div>
      <div className="canvas-div">
        <canvas id="canvas" width={500}></canvas>
      </div>
    {imagespass.length >0 &&  <Imagesdrag />}  
    </div>
  );
};

export default Home;
