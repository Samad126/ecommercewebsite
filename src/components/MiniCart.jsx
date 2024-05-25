import { useRef } from "react";

import iconDelete from "../assets/icon-delete.svg"

export default function MiniCart({ miniCartToggle, cartData, setCartData, sidebarToggle }) {
  const divRef = useRef();
  const headerRef = useRef();

  function handleRemove() {
    setCartData({
      price: null,
      count: null,
      img: null
    })
  }

  return (
    <>
      {!sidebarToggle ?
        <div ref={divRef} className={`absolute z-30 bg-white minicart top-10 right-1/2 shadow-slate-700 shadow-sm rounded overflow-hidden w-96 ${miniCartToggle ? "minicart-open" : "minicart-closed"}`} >
          <h2 ref={headerRef} className={miniCartToggle ? "text text-open mb-10" : "text text-closed"}>Your Cart</h2>
          {cartData.count != null ? <div className="w-full flex items-center justify-between cartData">
            <img className="h-12 rounded-lg cartDataImg" src={cartData.img} alt="orderImg" />
            <div className="flex flex-col">
              <h3>Fall Limited Edition Sneakers</h3>
              <p>$125.00 x {cartData.count} <b>${cartData.price}</b></p>
            </div>
            <button onClick={handleRemove}><img src={iconDelete} alt="removeOrder" /></button>
          </div> : <h3 className="p-10 text-center">Your Cart is empty</h3>}
        </div> : null}
    </>
  );
}
