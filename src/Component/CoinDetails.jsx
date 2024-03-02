import React from 'react'
import CoinDetailin from './CoinDetailin'
import CoinChart from './CoinChart'

const CoinDetails = () => {
  return (
    <div style={{display:'flex' }}>
      <CoinDetailin/>
      <div  className="">
      <CoinChart/>

      </div>

    </div>
  )
}

export default CoinDetails