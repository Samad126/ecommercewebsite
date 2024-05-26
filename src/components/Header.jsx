import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import MiniCart from "./MiniCart";

import cartimg from "../assets/icon-cart.svg";
import logosvg from "../assets/logo.svg";
import profileimg from "../assets/image-avatar.png";
import iconmenu from "../assets/icon-menu.svg";
import closeImg from "../assets/icon-close.svg";

export default function Header({ cartData, setCartData }) {
  const [miniCartToggle, setMiniCartToggle] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const cartButtonRef = useRef();

  function handleClick() {
    setMiniCartToggle(prev => !prev);
  }

  function handleSidebar() {
    setSidebarToggle(prev => !prev);
  }

  return (
    <header className="flex justify-center gap-72 items-center mb-28 p-6 max-lg:justify-between max-lg:gap-0">
      {createPortal(
        <div className="flex z-30">
          <div className={`backdrop ${sidebarToggle ? "backdrop-open " : "backdrop-closed"}`} onClick={() => setSidebarToggle(prev => !prev)}></div>
          <div className={`flex flex-col fixed z-30 h-full bg-white w-56 pt-24 sidebar ${sidebarToggle ? "max-w-56" : "max-w-0"}`}>
            <button className={`h-5 w-fit mb-10 absolute left-44 top-5 ${sidebarToggle ? "block" : "hidden"}`} onClick={() => setSidebarToggle(prev => !prev)}><img src={closeImg} alt="closeImg" /></button>
            <ul className="ml-10 flex flex-col gap-8">
              <li><a className={`font-bold sidebarLinks ${sidebarToggle ? "text text-open" : "text text-closed"}`} href="#">Collections</a></li>
              <li><a className={`font-bold sidebarLinks ${sidebarToggle ? "text text-open" : "text text-closed"}`} href="#">Men</a></li>
              <li><a className={`font-bold sidebarLinks ${sidebarToggle ? "text text-open" : "text text-closed"}`} href="#">Women</a></li>
              <li><a className={`font-bold sidebarLinks ${sidebarToggle ? "text text-open" : "text text-closed"}`} href="#">About</a></li>
              <li><a className={`font-bold sidebarLinks ${sidebarToggle ? "text text-open" : "text text-closed"}`} href="#">Contact</a></li>
            </ul>
          </div>
        </div>, document.getElementById("modal")
      )}
      <div className="flex items-center gap-20 linkslistdiv">
        <button onClick={handleSidebar} className="hidden sidebarButton"><img src={iconmenu} alt="sidebarbutton" /></button>
        <img src={logosvg} alt="logoimg" />
        <div className="flex gap-8 linkslist">
          <a href="#" className="links">Collections</a>
          <a href="#" className="links">Men</a>
          <a href="#" className="links">Women</a>
          <a href="#" className="links">About</a>
          <a href="#" className="links">Contact</a>
        </div>
      </div>
      <div className="flex items-center gap-5 relative">
        <span className={`text-white rounded-full bg-orange-500 ${cartData.count ? "w-6 h-6 p-2" : "w-0 h-0 p-0"} flex items-center justify-center absolute -top-5 left-5`}>
          {cartData.count}
        </span>
        <button onClick={handleClick} className="cartToggle" ref={cartButtonRef}>
          <img src={cartimg} alt="cartimg" />
        </button>
        <img src={profileimg} className="h-10" alt="profileimg" />
        <MiniCart
          miniCartToggle={miniCartToggle}
          cartData={cartData}
          setCartData={setCartData}
          setMiniCartToggle={setMiniCartToggle}
          sidebarToggle={sidebarToggle}
          cartButtonRef={cartButtonRef}
        />
      </div>
    </header>
  );
}
