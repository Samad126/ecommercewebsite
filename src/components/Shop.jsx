import { useState, useRef, useEffect } from "react";

import ImageSlider from "./ImageSlider";

import minusicon from "../assets/icon-minus.svg";
import plusicon from "../assets/icon-plus.svg";
import cartimg from "../assets/icon-cart.svg";

import imageproduct1l from "../assets/image-product-1-thumbnail.jpg";
import imageproduct2l from "../assets/image-product-2-thumbnail.jpg";
import imageproduct3l from "../assets/image-product-3-thumbnail.jpg";
import imageproduct4l from "../assets/image-product-4-thumbnail.jpg";

import imageproduct1 from "../assets/image-product-1.jpg";
import imageproduct2 from "../assets/image-product-2.jpg";
import imageproduct3 from "../assets/image-product-3.jpg";
import imageproduct4 from "../assets/image-product-4.jpg";

import leftArrwow from "../assets/icon-previous.svg"
import rightArrwow from "../assets/icon-next.svg"

const imgBigArr = [imageproduct1, imageproduct2, imageproduct3, imageproduct4];

const imgLittleArr = [
  imageproduct1l,
  imageproduct2l,
  imageproduct3l,
  imageproduct4l,
];


export default function Shop({ cartData, setCartData }) {
  const [imgNumber, setImgNumber] = useState(0);
  const [imgNumberSlider, setImgNumberSlider] = useState(0);
  const [pixel, setPixel] = useState(0);
  const [sliderBackdropToggle, setSliderBackdropToggle] = useState(false);

  const sliderRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = 0;
  })

  function handleImgChange(index) {
    setImgNumber(index);
  }


  function handleCount(type) {
    if (type === "plus") {
      inputRef.current.value = Number(inputRef.current.value) + 1;
    }
    else {
      if (inputRef.current.value != 0) {
        inputRef.current.value = Number(inputRef.current.value) - 1;
      }
    }
  }

  function handleAdd() {
    const inputValue = Number(inputRef.current.value);
    let count = 0;
    if (inputValue != 0 && inputValue > 0 && inputValue <= 30 && inputValue % 1 === 0) {
      if (cartData.count != null) {
        if (cartData.count + inputValue <= 30) {
          count = inputValue + cartData.count;
          alert("Item(s) added to cart");
        }
        else {
          alert(`You have ${cartData.count} items in the cart and you cant add ${inputValue} items to cart because stock is 30`);
          count = cartData.count;
        }
      }
      else {
        count = inputValue;
        alert("Item(s) added to cart");
      }
      setCartData({
        price: count * 125,
        count: count,
        img: imgLittleArr[imgNumber]
      })
    }
    else {
      alert("Please choose integer number between 1 and 30(max stock)");
    }
  }

  function handleSliderBackdrop() {
    setSliderBackdropToggle((prev) => !prev);
  }

  function handleClick(type) {
    if (type === 'right') {
      if (imgNumberSlider === imgBigArr.length - 1) {
        setImgNumberSlider(0);
        setPixel(0);
      }
      else {
        setPixel((prev) => { return prev - (sliderRef.current.clientWidth) });
        setImgNumberSlider((prev) => { return prev + 1 });
      }
    }
    else {
      if (imgNumberSlider === 0) {
        setImgNumberSlider(imgBigArr.length - 1);
        setPixel(-(sliderRef.current.clientWidth * (imgBigArr.length - 1)));
      }
      else {
        setPixel((prev) => { return prev + (sliderRef.current.clientWidth) });
        setImgNumberSlider((prev) => { return prev - 1 });
      }
    }
  }

  return (
    <>
      <div className="flex mx-auto justify-center gap-20 items-center max-w-5xl max-lg:flex-col cart">
        {sliderBackdropToggle ? <ImageSlider imgBigArr={imgBigArr} imgNumber={imgNumber} imgLittleArr={imgLittleArr} pixel={pixel} setPixel={setPixel} handleSliderBackdrop={handleSliderBackdrop} /> : null}
        <div ref={sliderRef} className="mobile hidden">
          <button className="bg-white p-4 rounded-full ml-2 flex justify-center items-center w-12 h-12" onClick={() => handleClick('left')} id="left"><img src={leftArrwow} alt="left" /></button>
          <div id="imageslider" className="flex overflow-hidden">
            {imgBigArr.map((img, index) => (
              <img style={{ transform: `translateX(${pixel}px)` }} className="" key={index} src={img} alt="" />
            ))}
          </div>
          <button className="bg-white p-4 rounded-full mr-2 flex justify-center items-center w-12 h-12 " onClick={() => handleClick('right')} id="right"><img src={rightArrwow} /></button>
        </div>
        <div className="desktop">
          <button onClick={setSliderBackdropToggle}>
            <img
              src={imgBigArr[imgNumber]}
              alt=""
              className="h-96 rounded-lg mb-6"
            />
          </button>
          <div className="flex justify-center gap-3">
            {imgLittleArr.map((img, index) => (
              <button
                onClick={() => handleImgChange(index)}
                key={index}
                className={
                  imgNumber === index
                    ? "outline outline-orange-400 outline-4 rounded-lg"
                    : null
                }
              >
                <img
                  className={
                    imgNumber === index
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
        <div className="cartText w-2/4 flex flex-col gap-6 max-lg:w-3/4">
          <h3 className="text-gray-400 font-bold tracking-widest">SNEAKER COMPANY</h3>
          <h2 className="font-bold text-5xl">Fall Limited Edition Sneakers</h2>
          <p className="text-gray-400 font-bold">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everythingsp
            the weather can offer.
          </p>
          <div>
            <p className="flex items-center gap-8 mb-4">
              <span className="font-bold text-4xl">$125.00 </span>
              <span className="bg-black text-white p-1 rounded">
                50%
              </span>
            </p>
            <del className="text-gray-400 font-bold">$250.00</del>
          </div>
          <div className="flex justify-between counterAndAddCart">
            <div className="flex items-center bg-slate-100 gap-6 rounded-lg inputDiv h-fit">
              <button className="pl-4 pr-4 pt-7 pb-7 active:outline active:outline-1 active:outline-orange-600 rounded active:scale-90 transition-transform duration-100" onClick={() => handleCount("minus")}>
                <img src={minusicon} alt="minus" />
              </button>
              <input ref={inputRef} type="number" className="bg-slate-100 w-12 text-center" name="count" />
              <button className="pl-4 pr-4 pt-6 pb-6 active:outline active:outline-1 active:outline-orange-600 rounded active:scale-90 transition-transform duration-100" onClick={() => handleCount("plus")}>
                <img src={plusicon} alt="plus" />
              </button>

            </div>
            <button onClick={handleAdd} className="flex items-center gap-5 text-white bg-orange-600 p-4 rounded-md w-2/4 justify-center addToCartButton hover:bg-white hover:outline hover:outline-1 hover:outline-orange-600 hover:text-black">
              <img src={cartimg} alt="" /> Add to cart
            </button>
          </div>
        </div>
      </div>
      <footer className="footer text-center mt-28 pb-10">Challenge by <a className="text-orange-600" href="https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6" target="_blank">Frontend Mentor</a>.
        Coded by <a target="_blank" className="text-orange-600" href="https://github.com/Samad126">Samad Alakbarov</a>.</footer>
    </>
  );
}
