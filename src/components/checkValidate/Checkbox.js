import React, { memo } from 'react';
import PropTypes from 'prop-types';
 
const changeHandler = (e, props) => {
  let { value, checked } = e.target;
 
  let newValue = [...props.value];
  newValue = checked ? [...newValue, value] : newValue.filter(x => x !== value);
 
  props.onChangeFunc(newValue, props.name, e);
 
  if (!props.onValidateFunc) return;
 
  let msg = null;
  if (Array.isArray(newValue) && !newValue.length && props.isReq) {
    msg = `Please select ${props.title}.`;
  }
 
  props.onValidateFunc(msg, props.name);
}
 
const Checkbox = props => {
 
  const inputProps = {
    type: "checkbox",
    name: props.name,
    className: props.className
  }
 
  return (
    <div className={props.outerClassName}>
      <label className="form-label">{props.title}</label>
      <div>
        {props.options.map((x, i) => <div key={i} className={`form-check${props.isVertical ? '' : ` form-check-inline`}`}>
          <input
            {...inputProps}
            id={x.value}
            value={x.value}
            checked={props.value.includes(x.value)}
            onChange={e => changeHandler(e, props)} />
          <label
            className="form-check-label"
            htmlFor={x.value}>
            {x.label}
          </label>
        </div>)}
      </div>
      {props.errorMsg && <span className="text-danger">{props.errorMsg === true ? `Please select ${props.title}.` : props.errorMsg}</span>}
    </div>
  )
}
 
Checkbox.defaultProps = {
  name: '',
  title: '',
  className: 'form-check-input',
  outerClassName: 'mb-2',
  isVertical: false,
  value: [],
  options: [],
  onChangeFunc: () => { },
  isReq: null,
  onValidateFunc: () => { }
}
 
Checkbox.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  isVertical: PropTypes.bool,
  value: PropTypes.array,
  options: PropTypes.array,
  onChangeFunc: PropTypes.func,
  isReq: PropTypes.bool,
  errorMsg: PropTypes.any,
  onValidateFunc: PropTypes.func
}
 
export default memo(Checkbox);