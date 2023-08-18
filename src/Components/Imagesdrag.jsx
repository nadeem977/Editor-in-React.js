import React, { useContext, useState, useRef, useEffect } from 'react';
import { Box } from "@mui/material";
import { AppContext } from '../context/EditorContext';
import '../App.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Imagesdrag = () => {


  const { imgget ,setImgget,setIndexs} = useContext(AppContext);
  const [ImgUrl, setImgeUrl] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const imagesDrag = useRef(null);
  const imagesDragOver = useRef(null);


  const DeleteImge = (imdID)=> {
    setIndexs(imdID)
    const  result = ImgUrl.filter((item) => item.id!== imdID)
    setImgeUrl(result)
    setImgget(result)
    console.log('Updated imgget:', imgget);
     }

  useEffect(() => {

    setImgeUrl(imgget)

  },[imgget])


  const D_Start = (index) => {
    imagesDrag.current = index;
    setIsDragging(true); 
  }

  const D_End = () => {
    if (imagesDrag.current !== null) {
        const items = [...ImgUrl];
        const Getitems = items[imagesDrag.current];
        items.splice(imagesDrag.current, 1);
        if (imagesDragOver.current !== null) {
          items.splice(imagesDragOver.current, 0, Getitems);
        } else {
          items.push(Getitems); 
        }
        imagesDrag.current = null;
        imagesDragOver.current = null;
        setImgeUrl(items);
        setIsDragging(false);
      }
    
  }
  const D_DragOver = (e, index) => {
    e.preventDefault();
    imagesDragOver.current = index; 
  }



  return (
    <Box className="imag-div">
      {ImgUrl && ImgUrl.map((imgUrl,index) => {
       return(
        <Box
        key={index}
        className={` ${isDragging && imagesDrag.current === index? 'dragging' : 'image-container'}`}
        draggable
        onDragStart={() => D_Start(index)}
        onDragEnd={D_End}
        onDragOver={(e) => D_DragOver(e, index)} >
          <Box className='icons'  onClick={(e) => {DeleteImge(imgUrl.id); }}><DeleteForeverIcon/></Box>
          <div style={{ width: 'fit-content' }}>
          <img src={imgUrl.imgDataUrl} alt={`uploaded ${index}`} className="imageset" />
        </div>
      </Box>
       )
      })}
    </Box>
  );
}

export default Imagesdrag;
