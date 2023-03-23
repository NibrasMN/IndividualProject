import Screenshot from "./component/Screenshot"
import CRUD from "./component/CRUD"
import html2canvas from 'html2canvas';
import { useEffect, useRef } from "react";
import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import Welcome from "./component/Welcome";



export default function App () {
  const ref = createRef(null)
  const captureRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot({type: 'image/jpeg',
  quality: 1.0,
  width: window.innerWidth,
  height: window.innerHeight});
  const getImage = () => takeScreenshot(ref.current)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef();

  useEffect(() => {
    if (captureRef.current) {
      html2canvas(captureRef.current, { scrollY: -window.scrollY })
        .then(canvas => {
        })
        .catch(error => {
          console.error('Error while taking screenshot:', error);
        });
    }
  }, [captureRef]);
  const handleDragStart = (event) => {
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const offsetX = event.clientX - buttonRect.left;
    const offsetY = event.clientY - buttonRect.top;

    const handleMouseMove = (event) => {
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;
      setPosition({ x: newX, y: newY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleMouseMove);
      },
      { once: true }
    );
  };
  
  return(
    <div>
    <div>
      <button
        ref={buttonRef}
        style={{ position: "absolute", top: position.y, left: position.x }}
        onMouseDown={handleDragStart} onDoubleClick={getImage}
      >
        <i class="fa-solid fa-camera"></i>
      </button>
    </div>
      <img  src={image}  />
    <div ref={ref}>
       
    
      <Screenshot/>
      <CRUD/>
      <Welcome/>
</div>

</div>
  )
}