import React from 'react';
import spinner from "./spinner.gif";

function Spinner() {
  return (
    <div className='text-center'>
      <img src={spinner} alt='spinner'></img>
    </div>
  )
}

export default Spinner
