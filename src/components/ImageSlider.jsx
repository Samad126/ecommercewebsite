import { useRef ,useState, useEffect } from "react";

import leftArrwow from "../assets/icon-previous.svg"
import rightArrwow from "../assets/icon-next.svg"
import closeModalImg from "../assets/icon-close.svg"

import { createPortal } from "react-dom";

export default function ImageSlider({ imgBigArr, imgNumber ,imgLittleArr, handleSliderBackdrop }) {
  const [imgNumberSlider, setImgNumberSlider] = useState(0);
  const [pixel, setPixel] = useState(0);

  useEffect(()=>{
    setImgNumberSlider(imgNumber);
    setPixel(-(imgNumber * 320));
  }, []);

  const sliderRef = useRef();

  function handleLittleImages(index) {
    setPixel(-(sliderRef.current.clientWidth * index));
    setImgNumberSlider(index);
  }

  function handleClick(type) {
    if (type === 'right'){
      if (imgNumberSlider === imgBigArr.length - 1) {
        setImgNumberSlider(0);
        setPixel(0);
      }
      else {
        setPixel((prev) => {return prev - (sliderRef.current.clientWidth)});
        setImgNumberSlider((prev) => {return prev + 1});
      }
    }
    else {
      if (imgNumberSlider === 0){
        setImgNumberSlider(imgBigArr.length - 1);
        setPixel(-(sliderRef.current.clientWidth * (imgBigArr.length - 1)));
      }
      else {
        setPixel((prev) => {return prev + (sliderRef.current.clientWidth)});
        setImgNumberSlider((prev) => {return prev - 1});
      }
    }
  }

  return (
    <>
      {createPortal(
        <div className="flex">
          <div onClick={() => handleSliderBackdrop(false)} className="opacity-80 w-full backdrop backdrop-open pointer-events-auto"></div>
          <div className="flex absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center">
            <button className="z-30 bg-white absolute top-40 flex justify-center items-center w-10 h-10 -left-0 p-3 rounded-full -translate-y-1/2" onClick={() => handleClick('left')} id="left"><img src={leftArrwow} alt="left" /></button>
            <div className="desktop flex flex-col items-center">
              <div id="imageslider" className="flex overflow-hidden w-80 mb-10 rounded-lg">
                {imgBigArr.map((img, index) => (
                  <img ref={sliderRef} style={{ transform: `translateX(${pixel}px)`}} className="h-80 rounded-lg" key={index} src={img} alt="" />
                ))}
              </div>
              <div className="flex justify-center gap-3">
                {imgLittleArr.map((img, index) => (
                  <button
                    onClick={() => handleLittleImages(index)}
                    key={index}
                    className={
                      imgNumberSlider === index
                        ? "outline outline-orange-400 outline-4 rounded-lg"
                        : null
                    }
                  >
                    <img
                      className={
                        imgNumberSlider === index
                          ? "w-20 rounded-lg opacity-50"
                          : "w-20 rounded-lg"
                      }
                      src={img}
                      alt="product image little"
                    />
                  </button>
                ))}
              </div>
            </div>
            <button className="z-30 bg-white absolute flex justify-center items-center w-10 h-10 top-40 -right-0 p-3 rounded-full -translate-y-1/2" onClick={() => handleClick('right')} id="left"><img src={rightArrwow} alt="right" /></button>
            <button className="absolute z-30 -right-10 -top-10 text-white" onClick={handleSliderBackdrop}><img src={closeModalImg} alt="closeModal" /></button>
          </div>
        </div>, document.getElementById('modal')
      )}
    </>
  );
}
