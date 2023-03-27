import React from 'react'
import './Loading.css'
const LoadingCustom = ({content}) => {
  return (
    <div class="loader loader-curtain is-active" data-brazilian data-curtain-text={content}></div>
  )
}
export default LoadingCustom
