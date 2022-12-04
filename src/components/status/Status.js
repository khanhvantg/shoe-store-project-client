import React from 'react'
import './ToggleSwitch.scss'
const Status = ({check}) => {
    
    // var a="checked"
  return (
    <label className="switch">
        <input type="radio" checked={check=="checked"}/>
        <span className="slider round"></span>
    </label>
  )
}

export default Status
