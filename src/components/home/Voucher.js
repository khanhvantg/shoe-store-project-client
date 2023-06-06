import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import copy from "copy-to-clipboard";
import Loading from '../loadingError/Loading';
const responsive = {
    0: {
      items: 1
    },
    765: {
      items: 2
    },
    1024: {
      items: 3
    }
  };
const Voucher = ({vouchers, loading}) => {
    const [copyText, setCopyText] = useState('');
 
    const handleCopyText = (value) => {
        navigator.clipboard.writeText(value);
        setCopyText(value);
    }

    // const copyToClipboard = async () => {
    //     await navigator.clipboard.writeText(copyText);
    //   }
  return (
      <>
    { loading?<Loading></Loading>:
    <AliceCarousel
    duration={400}
    autoPlay={true}
    startIndex = {1}
    fadeOutAnimation={true}
    mouseDragEnabled={true}
    playButtonEnabled={true}
    responsive={responsive}
    autoPlayInterval={2000}
    autoPlayDirection="rtl"
    autoPlayActionDisabled={true}>
        
            {vouchers&&vouchers.sort((a, b) => (b.id-a.id)).map((voucher, index)=>(
                <div className="voucher text-center">
                <li className="d-flex h-100">
                    <span className="" style={{ width: "100px" }}>
                        <h6 className="font-weight-bold mt-4">Discount</h6>
                        {Math.round(voucher.value * 100)}%
                    </span>
                    <span style={{ width: "200px" }}>
                        <h6 className="font-weight-bold mt-4 text-center mr-2">Voucher</h6>
                        <span className="mr-2">{voucher.name}</span>
                        <i className="tf-ion-ios-copy" style={{fontSize: "19px", marginLeft: "19px"}} onClick={()=>{handleCopyText(voucher.name)}}></i>
                        <br></br>
                        {copyText===voucher.name&&
                        <span style={{color:"green"}}>
                            Copied
                        </span>
                    }
                    </span>
                </li>
            </div>
        ))}
        </AliceCarousel>}
        </>
  )
}

export default Voucher
