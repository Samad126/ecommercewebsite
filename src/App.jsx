import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Shop from './components/Shop'

function App() {
  const [cartData, setCartData] = useState({
    price: null,
    count: null,
    img: null
  });
  
  return (
    <>
      <Header cartData={cartData} setCartData={setCartData}></Header>
      <Shop cartData={cartData} setCartData={setCartData}></Shop>
    </>
  )
}

export default App
