import { useRef, useEffect } from "react";
import iconDelete from "../assets/icon-delete.svg";

export default function MiniCart({ miniCartToggle, cartData, setCartData, setMiniCartToggle, sidebarToggle, cartButtonRef }) {
  const divRef = useRef();

  function handleRemove() {
    setCartData({
      price: null,
      count: null,
      img: null
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target) && !cartButtonRef.current.contains(event.target)) {
        setMiniCartToggle(false);
      }
    }

    if (miniCartToggle) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [miniCartToggle]);

  return (
    <>
      {!sidebarToggle ? (
        <div ref={divRef} className={`absolute z-30 bg-white minicart top-10 right-1/2 shadow-slate-700 shadow-sm rounded overflow-hidden w-96 ${miniCartToggle ? "minicart-open" : "minicart-closed"}`}>
          <h2 className={miniCartToggle ? "text text-open mb-10" : "text text-closed"}>Your Cart</h2>
          {cartData.count != null ? (
            <div className="w-full flex items-center justify-between cartData">
              <img className="h-12 rounded-lg cartDataImg" src={cartData.img} alt="orderImg" />
              <div className="flex flex-col">
                <h3>Fall Limited Edition Sneakers</h3>
                <p>$125.00 x {cartData.count} <b>${cartData.price}</b></p>
              </div>
              <button onClick={handleRemove}><img src={iconDelete} alt="removeOrder" /></button>
            </div>
          ) : (
            <h3 className="p-10 text-center">Your Cart is empty</h3>
          )}
        </div>
      ) : null}
    </>
  );
}
