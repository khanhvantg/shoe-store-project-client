import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from "react-select";

const ChangeHandler = (e, props) => {
  let value = null;
  let label = null;
  if (e) { value = e.value; label = e.label}
  props.onChangeFunc(label, value, props.name, e);
  // const selectInputRef1 = useRef();
  if (!props.onValidateFunc) return;
  let msg = null;
  if (!value && props.isReq) {
    msg = `Please Select ${props.title}.`;
    // onClear();
  }
  props.onValidateFunc(msg, props.name);
  // const onClear1 = () => {
  //   selectInputRef1.current.select.clearValue();
  // };
  // if(!value){
  //   onClear1();
  // }
}

const ChangeHandler1 = (e, props) => {
  let value = null;
  if (e) { value = e.value}
  const selectInputRef1 = useRef();
  const onClear1 = () => {
    selectInputRef1.current.select.clearValue();
  };
  if(!value&& props.isReq){
    onClear1();
  }
}

const Select = props => {
  // const selectInputRef = useRef();
  // console.log('ffff',selectInputRef)
  // const onClear = () => {
  //   if(props.value===null) selectInputRef.current.select.clearValue();
  // };
  const inputProps = {
    name: props.name,
    placeholder: props.placeholder || `Select ${props.title}`,
    className: props.className,
    isClearable: props.isClearable,
    value: props.options.find(x => x.value === props.value),
    options: props.options
  }
  return (
    <div className={props.outerClassName}>
      <label className="form-label">{props.title}</label>
      <ReactSelect
        {...inputProps}
        ref={ChangeHandler.selectInputRef1}
        onChange={e => {ChangeHandler(e, props);ChangeHandler1(e, props)}}
        // onBlur={inputProps.value===""&&(e => changeHandler(e, props))}
      />
      {props.errorMsg && <span className="text-danger">{props.errorMsg === true ? `Please Select ${props.title}.` : props.errorMsg}</span>}
    </div>
  )
}
 
Select.defaultProps = {
  name: '',
  title: '',
  placeholder: '',
  className: '',
  outerClassName: 'mb-2',
  isClearable: true,
  value: '',
  label: '',
  options: [],
  onChangeFunc: () => { },
  isReq: null,
  onValidateFunc: () => { }
}
 
Select.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  isClearable: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.any,
  options: PropTypes.array,
  onChangeFunc: PropTypes.func,
  isReq: PropTypes.bool,
  errorMsg: PropTypes.any,
  onValidateFunc: PropTypes.func
}
 
export default memo(Select);