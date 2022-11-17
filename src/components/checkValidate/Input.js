import React, { memo } from 'react';
import PropTypes from 'prop-types';
 
const getRegExp = (type) => {
  let regx = null;
  switch (type) {
    case 'EMAIL':
      regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case 'URL':
      regx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      break;
    default:
      break;
  }
  return regx;
}
 
const validationHandler = (e, props) => {
  if (!props.onValidateFunc) return;
 
  const { value, name } = e.target;
  let msg = null;

  if (!value && props.isReq) {
    msg = `Please Enter ${props.title}.`;
  } else if (value && props.reqType && !getRegExp(props.reqType).test(value)) {
    msg = `Please Enter Valid ${props.title}.`;
  } else if (value && props.type==='password' && value.trim().length<6) {
    msg = `Please Enter 6 Or More Characters`;
  }
  props.onValidateFunc(msg, name);
}
 
const Input = props => {
 
  const inputProps = {
    name: props.name,
    type: props.type,
    placeholder: props.placeholder || `Enter ${props.title}`,
    className: props.className,
    value: props.value
  }
 
  return (
    <div className="mb-4">
      <label className="form-label">{props.title}</label>
      <input
        {...inputProps}
        onChange={e => props.onChangeFunc(e.target.value, e.target.name, e)}
        onBlur={e => validationHandler(e, props)}
      />
      {props.errorMsg && <span className="text-danger">{props.errorMsg === true ? `Please Enter ${props.title}.` : props.errorMsg}</span>}
    </div>
  )
}
 
Input.defaultProps = {
  type: 'text',
  name: '',
  title: '',
  placeholder: '',
  className: 'form-control form-control-sm',
  outerClassName: 'mb-4',
  value: '',
  onChangeFunc: () => { },
  isReq: null,
  reqType: '',
  onValidateFunc: () => { }
}
 
Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  value: PropTypes.any,
  onChangeFunc: PropTypes.func,
  isReq: PropTypes.bool,
  reqType: PropTypes.string,
  errorMsg: PropTypes.any,
  onValidateFunc: PropTypes.func
}
 
export default memo(Input);