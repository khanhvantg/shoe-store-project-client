import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/checkValidate/Input'
import { getDataNumberByName, updateDataNumber } from '../redux/actions/DataNumberAction';
import Layout from './Layout'

const ManageVatScreen = () => {
    const [form,setForm]=useState({
        name: "vat",
        value: ""
    });
    const [errorSubmit, setErrorSubmit]=useState(true);
    const dispatch = useDispatch();
    const dataNumberDetail = useSelector((state) => state.dataNumberDetail);
    const { loading, error, dataNumber } = dataNumberDetail;

    const dataNumberUpdate = useSelector((state) => state.dataNumberUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = dataNumberUpdate;
    useEffect(() => {
        if (dataNumber && dataNumber.name !== "vat") {
            dispatch(getDataNumberByName());
        } else {
            setForm(prev=>({
                ...prev,
                value: dataNumber.value
            }))
        }
    }, [dataNumber]);

    const onInputValidate = (value, name) => {
        setErrorInput(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
    }
    const [errorInput, setErrorInput] = useState({
        value: {
            isReq: true,
            reqType: 'NUMBER',
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
    });
    const onInputChange = useCallback((value, name) => {
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);
    const validateForm = () => {
        let isInvalid = false;
        Object.keys(errorInput).forEach(x => {
            const errObj = errorInput[x];
            if (errObj.errorMsg) {
                isInvalid = true;
            } else if (errObj.isReq && !form[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }
    const submitHandler = () => {
        const isValid = validateForm();
        if (isValid) {
            dispatch(updateDataNumber({form}));
        }
    }
  return (
    <div className="wrapper1">
            <Layout />
            <div className="e-panel cardcus" style={{ width: "100%" }}>
                <div className="card-body">
                    <div className="text-center card-title">
                        <h3 className="mr-2">Vat Manage</h3>
                    </div>
                    <div className="container"style={{margin: "10px auto 20px auto", width: "50%"}}>
                        <Input
                            name="value"
                            title="Vat %"
                            value={form.value}
                            onChangeFunc={onInputChange}
                            {...errorInput.value}
                        />
                        <div className="text-center pt-1 mb-3 pb-1">
                            <button className="button-1" style={{width: "150.9px"}} onClick={false?"disabled":()=>{submitHandler()}}>
                                {/* {loadingUpdate?<Loading a={"16px"}/>:
                                "Save Changes"} */}
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ManageVatScreen
