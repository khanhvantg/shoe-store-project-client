import React from 'react'
import './ToggleSwitch.scss'
const Status = ({check}) => {
    
    // var a="checked"
  return (
    <label class="switch">
        <input type="radio" checked={check=="checked"}/>
        <span class="slider round"></span>
    </label>
  )
}

export default Status
