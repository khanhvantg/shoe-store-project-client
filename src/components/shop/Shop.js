import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductMain from './ProductMain';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
import { Link } from "react-router-dom";
const Shop = () => {
    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;
    const  [idCategory, setIdCategory] = useState('0');
    const categoryDetail = useSelector((state) => state.categoryDetail);
    const { success, category } = categoryDetail;

    const dispatchCategory = useDispatch();
    useEffect(() => {
        dispatchCategory(getAllcategories());
    }, [dispatchCategory]);

    const handleC = (e) => {
        setIdCategory(e.target.value);
    }
    return (
        <div className="shop-container">
            <section className="page-header">
                <div className="overly"></div> 	
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Shoes</h1>
                                {/* <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p> */}
                    
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Shoes</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="products-shop section">
                <div className="container">
                <div className="row">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-12 mb-4 mb-lg-0">
                                <div className="section-title">
                                    <h2 className="d-block text-left-sm">Product</h2>
                                    <div className="heading d-flex justify-content-between mb-5">
                                        <p className="result-count mb-0"></p>
                                        <form className="ordering">
                                        <select className="orderby form-control"
                                                value={idCategory}
                                                onChange={handleC} >
                                                <option value="0">All</option>
                                                {categories&&categories.map((item,index)=>(
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))};
                                        </select>
                                        <input type="hidden" name="paged" value="1" />
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="row">
                    
                        <ProductMain idCategory={idCategory}/>
                
                    </div>				
                    </div>
                </div>
                </div>
            </section>
        </div>
    )
}
export default Shop