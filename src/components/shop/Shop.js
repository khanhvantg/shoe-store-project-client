import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductMain from './ProductMain';
import { getAllcategories, getCategoryById, stopGetCategory } from '../../redux/actions/CategoryAction'
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
            <section class="page-header">
                <div class="overly"></div> 	
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <div class="content text-center">
                                <h1 class="mb-3">Shop</h1>
                                <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>
                    
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb bg-transparent justify-content-center">
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Shop</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="products-shop section">
                <div class="container">
                <div class="row">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-12 mb-4 mb-lg-0">
                                <div class="section-title">
                                    <h2 class="d-block text-left-sm">Product</h2>
                                    <div class="heading d-flex justify-content-between mb-5">
                                        <p class="result-count mb-0"></p>
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
                    <div class="row">
                    
                        <ProductMain idCategory={idCategory}/>
                
            
                        {/* <div class="col-12">
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                            </ul>
                        </nav>
                        </div> */}
                    </div>				
                    </div>
                    {/* <div class="col-md-3">
                
            
            
           
            <form class="mb-5">
            
                
              
                <section class="widget widget-colors mb-5">
                <h3 class="widget-title h4 mb-4">Shop by color</h3>
                <ul class="list-inline">
                    <li class="list-inline-item mr-4">
                    <div class="custom-control custom-checkbox color-checkbox">
                        <input type="checkbox" class="custom-control-input" id="color1" />
                        <label class="custom-control-label sky-blue" for="color1"></label>
                    </div>
                    </li>
                    <li class="list-inline-item mr-4">
                    <div class="custom-control custom-checkbox color-checkbox">
                        <input type="checkbox" class="custom-control-input" id="color2" checked />
                        <label class="custom-control-label red" for="color2"></label>
                    </div>
                    </li>
                    <li class="list-inline-item mr-4">
                    <div class="custom-control custom-checkbox color-checkbox">
                        <input type="checkbox" class="custom-control-input" id="color3" />
                        <label class="custom-control-label dark" for="color3"></label>
                    </div>
                    </li>
                    <li class="list-inline-item mr-4">
                    <div class="custom-control custom-checkbox color-checkbox">
                        <input type="checkbox" class="custom-control-input" id="color4" />
                        <label class="custom-control-label magenta" for="color4"></label>
                    </div>
                    </li>
                    <li class="list-inline-item mr-4">
                    <div class="custom-control custom-checkbox color-checkbox">
                        <input type="checkbox" class="custom-control-input" id="color5" />
                        <label class="custom-control-label yellow" for="color5"></label>
                    </div>
                    </li>
                </ul>
                </section>
            
               
                <section class="widget widget-sizes mb-5">
                <h3 class="widget-title h4 mb-4">Shop by Sizes</h3>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="size1" checked />
                    <label class="custom-control-label" for="size1">L Large</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="size2" />
                    <label class="custom-control-label" for="size2">XL Extra Large</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="size3" />
                    <label class="custom-control-label" for="size3">M Medium</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="size4" />
                    <label class="custom-control-label" for="size4">S Small</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="size5" />
                    <label class="custom-control-label" for="size5">XS Extra Small</label>
                </div>
                </section>
            
                <button type="button" class="btn btn-black btn-small">Filter</button>
            </form>
            
         
            <section class="widget widget-popular mb-5">
                <h3 class="widget-title mb-4 h4">Popular Products</h3>
                <a class="popular-products-item media" href="/product-single">
                <img src="assets/images/p-1.jpg" alt="" class="img-fluid mr-4" />
                <div class="media-body">
                    <h6>Contrast <br />Backpack</h6>
                    <span class="price">$45</span>
                </div>
                </a>
            
                <a class="popular-products-item media" href="/product-single">
                <img src="assets/images/p-2.jpg" alt="" class="img-fluid mr-4" />
                <div class="media-body">
                    <h6>Hoodie with <br />Logo</h6>
                    <span class="price">$45</span>
                </div>
                </a>
            
                <a class="popular-products-item media" href="/product-single">
                <img src="assets/images/p-3.jpg" alt="" class="img-fluid mr-4" />
                <div class="media-body">
                    <h6>Traveller<br />Backpack</h6>
                    <span class="price">$45</span>
                </div>
                </a>
                    </section>
                    </div>*/}
                </div>
                </div>
            </section>
        </div>
    )
}
export default Shop