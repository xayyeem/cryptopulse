import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Exchanges from './Component/Exchanges'
import Coins from './Component/Coins'
// import CoinDetails from './Component/CoinDetails'
import CoinDetailin from './Component/CoinDetailin'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Exchanges/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/coins/:id' element={<CoinDetailin/>}/>


      </Routes>
    </div>
  )
}

export default App