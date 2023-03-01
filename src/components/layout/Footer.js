function Footer() {
    return (
        <div className="footer-container border-top" style={{background:"white"}}>
            <footer className="footer" style={{background:"white"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 col-sm-6 mb-5 mb-lg-0 text-center text-sm-left mr-auto">
                            <div className="footer-widget">
                                    <h4 className="mb-4">E-Shop</h4>
                                    <p className="lead">Welcome To E-Shop. We Are Very Happy To Serve You.</p>
                                    <div className="">
                                        <p className="mb-0"><strong>Location: </strong>1St, Vo Van Ngan, Thu Duc City</p>
                                        <p><strong>Support Email: </strong> TLCN@gmail.com</p>
                                    </div>
                            </div>
                        </div>
                       
                        <div className="col-md-6 col-lg-3 col-sm-6 text-center text-sm-left">
                            <div className="footer-widget">
                                <h4 className="mb-4">Opening Hours</h4>
                                <ul className="pl-0 list-unstyled mb-5">
                                    <li className="d-lg-flex justify-content-between">Monday-Friday <span>8.00-20.00</span></li>
                                    <li className="d-lg-flex justify-content-between">Saturday <span>10.00-20.00</span></li>
                                    <li className="d-lg-flex justify-content-between">Sunday <span>12.00-20.00</span></li>
                                </ul>
                                <h5>Call Now : +(84) 94 529 1068</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <div className="footer-btm py-4 ">
                <div className="container">
                    <div className="center">
                        <div className="col-lg-9">
                            <ul className="list-inline mb-0 footer-btm-links text-lg-right mt-2 mt-lg-0">
                            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="#">Terms &amp; Conditions</a></li>
                            <li className="list-inline-item"><a href="#">Cookie Policy</a></li>
                            <li className="list-inline-item"><a href="#">Terms of Sale</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
   );
}

export default Footer;