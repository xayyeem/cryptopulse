import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Exchanges from './Component/Exchanges'
import Coins from './Component/Coins'
import CoinDetails from './Component/CoinDetails'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Exchanges/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/coinsDetail/:id' element={<CoinDetails/>}/>


      </Routes>
    </div>
  )
}

export default App