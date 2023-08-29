import React, { useContext, useState } from "react";
import { fabric } from "fabric";
import { Box, Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import { AppContext } from "../context/EditorContext";

const ButtonsFunctionality = () => {
  const { canvas } = useContext(AppContext);
  const [rotationAngle, setRotationAngle] = useState(0);
  const rotateSelectedObject = (angle) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.rotate(angle);
        canvas.renderAll();
      }
    }
  };
  const handleColor = (e) => {
    const selectedColor = e.target.value;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("fill", selectedColor);
      canvas.renderAll();
    }
  };

  const handlebackground = (e) => {
    const selectedBack = e.target.value;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("backgroundColor", selectedBack);
      canvas.renderAll();
    }
  };

  const handletextBack = (e) => {
    const selectedtextBack = e.target.value;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("textBackgroundColor", selectedtextBack);
      canvas.renderAll();
    }
  };

  const handleFontFamily = (e) => {
    const selectedFont = e.target.value;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("fontFamily", selectedFont);
      canvas.renderAll();
    }
  };

  const handleFontSize = (e) => {
    const selectSize = e.target.value;
    const fontSize = selectSize >= 10 ? selectSize : 10;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("fontSize", selectSize);
      canvas.renderAll();
    }
  };

  const handleFontWeight = (e) => {
    const selectWeight = e.target.value;
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("fontWeight", selectWeight);
      canvas.renderAll();
    }
  };

  const handleUnderline = () => {
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("underline", activeText.underline === true ? false : true);
      canvas.renderAll();
    }
  };

  const handleOverline = () => {
    if (canvas.getActiveObject() instanceof fabric.Text) {
      const activeText = canvas.getActiveObject();
      activeText.set("overline", activeText.overline === true ? false : true);
      canvas.renderAll();
    }
  };

  const handlevalue = (e) => {
    const val = e.target.value;
    const activeObject = canvas.getActiveObject();
  
    if (activeObject) {
      if (activeObject instanceof fabric.Image || activeObject instanceof fabric.Textbox) {
        activeObject.set({
          opacity: val / 100,
        });
        canvas.renderAll();
      }
    }
  };
  
  return (
    <>
      <Box className="todiv">
        <div style={{ width: "150px" }}>Text color</div>
        <label htmlFor="colorPicker"></label>
        <input
          type="color"
          id="colorPicker"
          value="#fc466b"
          onChange={handleColor}
        />
      </Box>
      <Box className="todiv">
        <div style={{ width: "150px" }}>Box back</div>
        <label htmlFor="colorPickerback"></label>
        <input
          type="color"
          id="colorPickerback"
          value="#fc466b"
          onChange={handlebackground}
        />
      </Box>
      <Box className="todiv">
        <div style={{ width: "150px" }}>Text back</div>
        <label htmlFor="colorPickertextback"></label>
        <input
          type="color"
          id="colorPickertextback"
          value="#fc466b"
          onChange={handletextBack}
        />
      </Box>
      <Form.Select
        aria-label="Default select example"
        className="fontfamily"
        onClick={handleFontFamily}
      >
        <option>Font Family</option>
        <option value="Barriecito" style={{ fontFamily: "Barriecito" }}>
          Barriecito
        </option>
        <option value="Borel" style={{ fontFamily: "Barriecito" }}>
          Borel
        </option>
        <option value="Dancing Script" style={{ fontFamily: "Dancing Script" }}>
          Dancing Script
        </option>
        <option value="Bebas Neue" style={{ fontFamily: "Bebas Neue" }}>
          Bebas Neue
        </option>
        <option value="Gluten" style={{ fontFamily: "Gluten" }}>
          Gluten
        </option>
        <option value="Handjet" style={{ fontFamily: "Handjet" }}>
          Handjet
        </option>
        <option value="Josefin Sans" style={{ fontFamily: "Josefin Sans" }}>
          Josefin Sans
        </option>
        <option value="Lisu Bosa" style={{ fontFamily: "Lisu Bosa" }}>
          Lisu Bosa
        </option>
        <option value="Orbitron" style={{ fontFamily: "Orbitron" }}>
          Orbitron
        </option>
        <option value="Poppins" style={{ fontFamily: "Poppins" }}>
          Poppins
        </option>
        <option
          value="Sedgwick Ave Display"
          style={{ fontFamily: "Sedgwick Ave Display" }}
        >
          Sedgwick Ave Display
        </option>
        <option value="Tilt Prism" style={{ fontFamily: "Tilt Prism" }}>
          Tilt Prism
        </option>
        <option value="Ubuntu" style={{ fontFamily: "Ubuntu" }}>
          Ubuntu
        </option>
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="fontfamily"
        onChange={handleFontSize}
      >
        <option>Font Size</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="fontfamily"
        onChange={handleFontWeight}
      >
        <option>Font weight</option>
        <option value="200">200</option>
        <option value="400">400</option>
        <option value="600">600</option>
        <option value="800">800</option>
      </Form.Select>
      <Button
        variant="contained"
        color="secondary"
        style={{ textDecoration: "underline" }}
        onClick={handleUnderline}
      >
        {" "}
        text underline
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ textDecoration: "overline" }}
        onClick={handleOverline}
      >
        {" "}
        text Overline
      </Button>
      <Box className="todiv"> Opacity
        <input
          type="range"
          id="shadowRange"
          min="1"
          max="100"
          step="1"
          defaultValue="0"
          onChange={handlevalue}
        />
      </Box>
      <div className="todiv">
        Rotate{" "}
        <input
          type="range"
          min="0"
          max="360"
          value={rotationAngle}
          onChange={(e) => {
            setRotationAngle(parseInt(e.target.value));
            rotateSelectedObject(parseInt(e.target.value));
          }}
        />
      </div>
    </>
  );
};

export default ButtonsFunctionality;
