import React, { memo, useCallback, useState } from 'react';
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
    case 'PHONE':
      regx = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
      break;
    case 'NAME':
      regx = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/gm;
      break;
    case 'AGE':
      regx = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/;
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
  const [isShow, setIsShow ] = useState(false);
  const show = useCallback(() => {
    setIsShow(!isShow);
  },[isShow])
 
  return (
    <>
    { props.type&&props.type==="password"?
      <div className="mb-4">
        <label className="form-label">{props.title}</label>
          <div style={{position: "relative"}}>
            <input style={{background:"white"}}
              {...inputProps}
              type={isShow ? 'text' : props.type }
              onChange={e => props.onChangeFunc(e.target.value, e.target.name, e)}
              onBlur={e => validationHandler(e, props)}
            />
              <span className = "text-center"
                onClick={show}
                style={{position: "absolute",
                        fontSize:20,
                        right: 10,
                        top: 14,
                        cursor: "pointer"}}
                >
              <i className={isShow?"tf-ion-eye":"tf-ion-eye-disabled"}></i>
             </span>
        </div>
      
      {props.errorMsg && <span className="text-danger">{props.errorMsg === true ? `Please Enter ${props.title}.` : props.errorMsg}</span>}
    </div>
    :
    <div className="mb-4">
      <label className="form-label">{props.title}</label>
      <input style={{background:"white"}}
        {...inputProps}
        onChange={e => props.onChangeFunc(e.target.value, e.target.name, e)}
        onBlur={e => validationHandler(e, props)}
      />
      {props.errorMsg && <span className="text-danger">{props.errorMsg === true ? `Please Enter ${props.title}.` : props.errorMsg}</span>}
    </div>
    }
    </>
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